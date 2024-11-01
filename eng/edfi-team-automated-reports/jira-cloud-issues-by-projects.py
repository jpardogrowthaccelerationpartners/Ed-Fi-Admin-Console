#!/usr/bin/python3
import requests
import configparser
from datetime import datetime
from string import Template
import pprint

# Read config.ini file
config = configparser.ConfigParser()
config.read("./eng/edfi-team-automated-reports/config.ini")

# Load Jira configuration from config.ini
jira_server = config["Jira"]["JIRA_BASE_URL"]
jira_email = config["Jira"]["JIRA_USERNAME"]
jira_token = config["Jira"]["JIRA_API_TOKEN"]

# TODO: move this to config.ini
edfiProducts = ["DI", "APIPUB", "AA", "ADMINAPI"]

class JiraReportItem:
    def __init__(self):
        self.product_name = ""
        self.open_issues = ""
        self.open_bugs = ""
        self.open_stories = ""
        self.open_improvements = ""
        self.open_spikes = ""
        self.open_epics = ""
        self.blocker = ""
        self.critical = ""
        self.major = ""
        self.minor = ""
        self.trivial = ""

def markdown_string(report_items):
    md_ret = "| Product Queue | Open Issues | Bugs | Stories | Improvements | Spikes | Epics | Blocker | Critical 🔴 | Major 🟠 | Minor 🟢 | Trivial 🟣|\n" \
             "| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |\n"
    for ri in report_items:
        md_ret += "|" + ri.product_name + "|" + ri.open_issues + "|" + \
               ri.open_bugs + "|" + ri.open_stories + "|" + ri.open_improvements + "|" + ri.open_spikes + "|" + ri.open_epics + "|" + \
               ri.blocker + "|" + ri.critical + "|" + ri.major + "|" + ri.minor + "|" + ri.trivial + "|\n"
    md_ret += "\n\n_Last generated: " + datetime.now().strftime("%m/%d/%Y, %H:%M:%S") + "_"
    return md_ret

# Jira Cloud API query templates
open_issues_jql = 'project = "${PRODUCT}" AND resolution = Unresolved AND (Type != Test AND Type != Epic)'
open_bugs_jql = open_issues_jql + ' AND Type = Bug'
open_stories_jql = open_issues_jql + ' AND Type = Story'
open_improvements_jql = open_issues_jql + ' AND Type = Improvement'
open_spikes_jql = open_issues_jql + ' AND Type = Spike'
open_epics_jql = 'project = "${PRODUCT}" AND resolution = Unresolved AND Type = Epic'

open_blocker_jql = open_issues_jql + ' AND Priority = Blocker'
open_critical_sql = open_issues_jql + ' AND Priority = Critical'
open_major_jql = open_issues_jql + ' AND Priority = Major'
open_minor_jql = open_issues_jql + ' AND Priority = Minor'
open_trivial_jql = open_issues_jql + ' AND Priority = Trivial'

edfiQueries = [open_issues_jql, open_bugs_jql, open_stories_jql, open_improvements_jql, open_spikes_jql, open_epics_jql, open_blocker_jql, open_critical_sql, open_major_jql, open_minor_jql, open_trivial_jql]

headers = {
    "Authorization": requests.auth._basic_auth_str(jira_email, jira_token),
    "Content-Type": "application/json"
}

def get_issue_count(jql_query):
  
    url = f"{jira_server}/rest/api/3/search"
    params = {
        "jql": jql_query,
        "maxResults": 0  # We only need the total count, so setting maxResults to 0
    }
    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        return response.json().get("total", 0)
    else:
        print(f"Error fetching data from Jira: {response.status_code}")
        pprint.pprint(response.text)
        return 0

report_items = []

for product in edfiProducts:
    report_item = JiraReportItem()
    report_item.product_name = f"{product}"

    for index, query in enumerate(edfiQueries):
        jql_query = Template(query).substitute(PRODUCT=product)
        issue_count = get_issue_count(jql_query)

        match index:
            case 0: report_item.open_issues = str(issue_count)
            case 1: report_item.open_bugs = str(issue_count)
            case 2: report_item.open_stories = str(issue_count)
            case 3: report_item.open_improvements = str(issue_count)
            case 4: report_item.open_spikes = str(issue_count)
            case 5: report_item.open_epics = str(issue_count)
            case 6: report_item.blocker = str(issue_count)
            case 7: report_item.critical = str(issue_count)
            case 8: report_item.major = str(issue_count)
            case 9: report_item.minor = str(issue_count)
            case 10: report_item.trivial = str(issue_count)

    report_items.append(report_item)

# Generate Markdown content
body = markdown_string(report_items)

# Write Markdown content to file
with open("jira_report.md", "w") as f:
    f.write(body)

print("Markdown report generated as 'jira_report.md'")
