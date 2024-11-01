#!/usr/bin/python3
import requests
import json
from datetime import datetime
from pprint import pprint
import github
from atlassian import Confluence
from string import Template

edfi_repos = ["Ed-Fi-Alliance-OSS/Ed-Fi-ODS", "Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation", "Ed-Fi-Alliance-OSS/Ed-Fi-ODS-AdminApp", "Ed-Fi-Alliance-OSS/Ed-Fi-API-Publisher", "Ed-Fi-Alliance-OSS/Ed-Fi-AdminAPI", "Ed-Fi-Alliance-OSS/AdminAPI-2.0", "Ed-Fi-Alliance-OSS/Ed-Fi-DataImport", "Ed-Fi-Closed/MetaEd-js", "Ed-Fi-Exchange-OSS/Meadowlark", "Ed-Fi-Alliance-OSS/Roster-Starter-Kit-for-Vendors", "Ed-Fi-Alliance-OSS/Ed-Fi-LearningStandards-Client"]
github_url_template = "https://api.github.com/repos/${REPO}/dependabot/alerts?state=open"
github_repo_template = "https://github.com/${REPO}/security/dependabot"
confluence_url = "https://techdocs.ed-fi.org/"

github_app_token = "**token**"
confluence_token = "**token**"

headers = {'Authorization': 'Bearer ' + github_app_token, 'Accept': 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28'}

class JiraReportItem:
    def __init__(self):
        self.repo = ""
        self.overall = 0
        self.critical = 0
        self.high = 0
        self.medium = 0
        self.low = 0

def markdown_print(report_items):
    print()
    print()
    print("||GitHub Product Repo|| ||Overall|| ||Critical||High||Medium||Low||") 
    for item in report_items:
        url = "[" + item.repo + "|" + Template(github_repo_template).substitute(REPO=item.repo) + "]"
        print("|", url, "| |", item.overall, "| |", item.critical, "|", item.high, "|", item.medium, "|", item.low, "|")
    print()
    print()
    print("_Last generated: " + datetime.now().strftime("%m/%d/%Y, %H:%M:%S") + "_")
    print()

def markdown_string(report_items):
    md_ret = "||GitHub Product Repo|| ||Overall|| ||Critical||High||Medium||Low||\n"
    for item in report_items:
        url = "[" + item.repo + "|" + Template(github_repo_template).substitute(REPO=item.repo) + "]"
        md_ret += "|"+ url+ "| |"+ str(item.overall)+ "| |"+ str(item.critical)+ "|"+ str(item.high)+ "|"+ str(item.medium)+ "|"+ str(item.low)+ "|\n"

    md_ret += "\n\n_Last generated: " + datetime.now().strftime("%m/%d/%Y, %H:%M:%S") + "_"
    return md_ret



report_items = []

for edfi_repo in edfi_repos:
    item = JiraReportItem()
    url = Template(github_url_template).substitute(REPO=edfi_repo)
    response = requests.get(url, headers=headers)
    item.repo=edfi_repo

    if response.status_code==200:
        response_json = json.loads(response.content)
        item.overall = len(response_json)

        if len(response_json) > 0:
            for res in response_json:
                match res["security_vulnerability"]["severity"]:
                    case "critical":
                        item.critical += 1
                    case "high":
                        item.high += 1
                    case "medium":
                        item.medium += 1
                    case "low":
                        item.low += 1    
        
        report_items.append(item)


#markdown_print(report_items)
body = markdown_string(report_items)

confluence = Confluence(url=confluence_url, token=confluence_token)
page_title = "Product Dependabot Alerts"
page = confluence.get_page_by_title(title=page_title, space="TT")
confluence.update_page(page["id"], page_title, body, parent_id=None, type='page', representation='wiki', minor_edit=False, full_width=False)



# import yaml; from munch import munchify; f = munchify(yaml.load(…)); print(fo.d.try)
