#!/usr/bin/python3
import requests
import json
import urllib
from jira.client import JIRA

from datetime import datetime
from pprint import pprint
import github
from atlassian import Confluence
from string import Template
import yaml;                                                                

edfiProducts = [ "ODS", "DATASTD", "METAED", "ADMINAPI", "AA", "APIPUB", "DI", "TPDMDEV", "RND"]

jiraServer = "https://tracker.ed-fi.org/"
jiraToken = "**token**"
confluence_url = "https://techdocs.ed-fi.org/"
confluence_token = "**token**"


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

def markdown_print(report_items):
    print()
    print()
    print("||Product Queue|| ||Open Issues||Bugs||Stories||Improvements||Spikes||Epics|| ||Blocker||Critical||Major||Minor||Trivial||") 

    for ri in report_items:
        print("|" + ri.product_name + "| |" 
            + str(ri.open_issues) + "|" + str(ri.open_bugs) + "|" + str(ri.open_stories) + "|" + str(ri.open_improvements) + "|" + str(ri.open_spikes) + "|" + str(ri.open_epics) + "| |"
            + str(ri.blocker) + "|" + str(ri.critical) + "|" + str(ri.major) + "|" + str(ri.minor) + "|" + str(ri.trivial) + "|")
        
    print()
    print("_Last generated: " + datetime.now().strftime("%m/%d/%Y, %H:%M:%S") + "_")

def markdown_string(report_items):
    md_ret = "||Product Queue|| ||Open Issues||Bugs||Stories||Improvements||Spikes||Epics|| ||Blocker||Critical||Major||Minor||Trivial||\n"

    for ri in report_items:
        md_ret += "|" + ri.product_name + "| |" + \
        ri.open_issues + "|" + ri.open_bugs + "|" + ri.open_stories + "|" + ri.open_improvements + "|" + ri.open_spikes + "|" + ri.open_epics + "| |" + \
        ri.blocker + "|" + ri.critical + "|" + ri.major + "|" + ri.minor + "|" + ri.trivial + "|\n"

    md_ret += "\n\n_Last generated: " + datetime.now().strftime("%m/%d/%Y, %H:%M:%S") + "_"
    return md_ret

jiraOptions = {'server': jiraServer}

open_issues_jql = 'project = ${PRODUCT} AND resolution = Unresolved AND (Type != Test AND Type != Epic)'
open_bugs_jql = open_issues_jql + ' AND Type = Bug'
open_stories_jql = open_issues_jql + ' AND Type = Story'
open_improvements_jql = open_issues_jql + ' AND Type = Improvement'
open_spikes_jql = open_issues_jql + ' AND Type = Spike'
open_epics_jql = 'project = ${PRODUCT} AND resolution = Unresolved AND (Type != Test) AND Type = Epic'

open_blocker_jql = open_issues_jql + ' AND Priority = Blocker'
open_critical_sql = open_issues_jql + ' AND Priority = Critical'
open_major_jql = open_issues_jql + ' AND Priority = Major'
open_minor_jql = open_issues_jql + ' AND Priority = Minor'
open_trivial_jql = open_issues_jql + ' AND Priority = Trivial'

edfiQueries = [ open_issues_jql, open_bugs_jql, open_stories_jql, open_improvements_jql, open_spikes_jql, open_epics_jql, open_blocker_jql, open_critical_sql, open_major_jql, open_minor_jql, open_trivial_jql]

jira = JIRA(options=jiraOptions, token_auth=jiraToken)

report_items = []

for product in edfiProducts:
    report_item = JiraReportItem()
    report_item.product_name = "[" + product + "|https://tracker.ed-fi.org/projects/" + product + "]"

    for index, query in enumerate(edfiQueries):
        jql_query = Template(query).substitute(PRODUCT=product)
        search = jira.search_issues(jql_query, json_result=True, maxResults=1)

        match index:
            case 0:
                report_item.open_issues = "[" + str(search["total"]) + "|" + jiraServer + "issues/?jql=" + urllib.parse.quote(Template(open_issues_jql).substitute(PRODUCT=product)) + "]" 
            case 1:
                report_item.open_bugs = "[" + str(search["total"]) + "|" + jiraServer + "issues/?jql=" + urllib.parse.quote(Template(open_bugs_jql).substitute(PRODUCT=product)) + "]"
            case 2:
                report_item.open_stories = "[" + str(search["total"]) + "|" + jiraServer + "issues/?jql=" + urllib.parse.quote(Template(open_stories_jql).substitute(PRODUCT=product)) + "]"
            case 3:
                report_item.open_improvements = "[" + str(search["total"]) + "|" + jiraServer + "issues/?jql=" + urllib.parse.quote(Template(open_improvements_jql).substitute(PRODUCT=product)) + "]"
            case 4:
                report_item.open_spikes = "[" + str(search["total"]) + "|" + jiraServer + "issues/?jql=" + urllib.parse.quote(Template(open_spikes_jql).substitute(PRODUCT=product)) + "]"
            case 5:
                report_item.open_epics = "[" + str(search["total"]) + "|" + jiraServer + "issues/?jql=" + urllib.parse.quote(Template(open_epics_jql).substitute(PRODUCT=product)) + "]"               
            case 6:
                report_item.blocker = "[" + str(search["total"]) + "|" + jiraServer + "issues/?jql=" + urllib.parse.quote(Template(open_blocker_jql).substitute(PRODUCT=product)) + "]"
            case 7:
                report_item.critical = "[" + str(search["total"]) + "|" + jiraServer + "issues/?jql=" + urllib.parse.quote(Template(open_critical_sql).substitute(PRODUCT=product)) + "]"
            case 8:
                report_item.major = "[" + str(search["total"]) + "|" + jiraServer + "issues/?jql=" + urllib.parse.quote(Template(open_major_jql).substitute(PRODUCT=product)) + "]"
            case 9:
                report_item.minor = "[" + str(search["total"]) + "|" + jiraServer + "issues/?jql=" + urllib.parse.quote(Template(open_minor_jql).substitute(PRODUCT=product)) + "]"
            case 10:
                report_item.trivial = "[" + str(search["total"]) + "|" + jiraServer + "issues/?jql=" + urllib.parse.quote(Template(open_trivial_jql).substitute(PRODUCT=product)) + "]"

    report_items.append(report_item)

#markdown_print(report_items)
body = markdown_string(report_items)

confluence = Confluence(url=confluence_url, token=confluence_token)
page_title = "Product Issues by Type and Priority"
page = confluence.get_page_by_title(title=page_title, space="TT")
confluence.update_page(page["id"], page_title, body, parent_id=None, type='page', representation='wiki', minor_edit=False, full_width=False)
