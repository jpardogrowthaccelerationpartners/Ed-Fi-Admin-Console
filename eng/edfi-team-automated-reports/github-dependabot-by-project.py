#!/usr/bin/python3 
import requests
import configparser
import json
from datetime import datetime
from string import Template

# Load configuration from config.ini
config = configparser.ConfigParser()
config.read("./eng/edfi-team-automated-reports/config.ini")

# Config variables
github_token = config["GitHub"]["GITHUB_TOKEN"]
markdown_output_file = "github_dependabot_report.md"

# GitHub repositories
edfi_repos = [
    #"Ed-Fi-Alliance-OSS/Ed-Fi-ODS", "Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation",
    "Ed-Fi-Alliance-OSS/Ed-Fi-ODS-AdminApp", "Ed-Fi-Alliance-OSS/Ed-Fi-API-Publisher",
    "Ed-Fi-Alliance-OSS/Ed-Fi-AdminAPI-1.x", "Ed-Fi-Alliance-OSS/AdminAPI-2.x",
    #"Ed-Fi-Alliance-OSS/Ed-Fi-DataImport", "Ed-Fi-Closed/MetaEd-js",
    #"Ed-Fi-Exchange-OSS/Meadowlark", "Ed-Fi-Alliance-OSS/Roster-Starter-Kit-for-Vendors",
    #"Ed-Fi-Alliance-OSS/Ed-Fi-LearningStandards-Client"
]

# Templates for GitHub API URLs
github_url_template = "https://api.github.com/repos/${REPO}/dependabot/alerts?state=open"
github_repo_template = "https://github.com/${REPO}/security/dependabot"

# Headers for GitHub API
headers = {
    'Authorization': f'Bearer {github_token}',
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
}

class JiraReportItem:
    def __init__(self):
        self.repo = ""
        self.overall = 0
        self.critical = 0
        self.high = 0
        self.medium = 0
        self.low = 0

def markdown_string(report_items):
    md_ret = "| GitHub Product Repo | Overall | Critical 🔴| High 🟠 | Medium 🟢 | Low 🟣 |\n"\
            "| :---: | :---: | :---: | :---: | :---: | :---: |\n"
    for item in report_items:
        url = Template(github_repo_template).substitute(REPO=item.repo) + "|" 
        md_ret += "|" + url + "|" + str(item.overall) + "|" + str(item.critical) + "|" + str(item.high) + "|" + str(item.medium) + "|" + str(item.low) + "|\n"
    md_ret += "\n\n_Last generated: " + datetime.now().strftime("%m/%d/%Y, %H:%M:%S") + "_"
    return md_ret

report_items = []

# Fetch alerts for each repository
for edfi_repo in edfi_repos:
    item = JiraReportItem()
    item.repo = edfi_repo
    url = Template(github_url_template).substitute(REPO=edfi_repo)
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        response_json = json.loads(response.content)
        item.overall = len(response_json)
        
        if response_json:
            for alert in response_json:
                severity = alert["security_vulnerability"]["severity"]
                match severity:
                    case "critical": item.critical += 1
                    case "high": item.high += 1
                    case "medium": item.medium += 1
                    case "low": item.low += 1
                
        report_items.append(item)
    else:
        print(f"Error fetching data for {edfi_repo}: {response.status_code}")

# Generate Markdown content
body = markdown_string(report_items)

# Write to Markdown file
with open(markdown_output_file, "w") as f:
    f.write(body)

print(f"Markdown report generated as '{markdown_output_file}'")
