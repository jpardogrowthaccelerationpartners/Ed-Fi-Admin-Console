import requests
import argparse
import configparser
import os
import pprint
import json
from markdownify import markdownify as md

class Issue:
    def __init__(self, key, summary):
        self.key = key
        self.summary = summary

    def __repr__(self):
        return f"Issue(key={self.key}, summary={self.summary})"

# Function to read configuration from an INI file in the current directory
def read_config(config_file='config.ini'):
    if not os.path.exists(config_file):
        raise FileNotFoundError(f"Config file {config_file} not found.")
    
    config = configparser.ConfigParser()
    config.read(config_file)

    if 'Jira' not in config:
        raise ValueError("Missing 'Jira' section in config file.")

    jira_config = {
        'base_url': config.get('Jira', 'JIRA_BASE_URL'),
        'username': config.get('Jira', 'JIRA_USERNAME'),
        'api_token': config.get('Jira', 'JIRA_API_TOKEN')
    }

    return jira_config

# Jira API endpoints
SEARCH_API_URL = '/rest/api/3/search'

def get_issues_by_version(jira_config, project_key, version):
    # JQL query to fetch issues by release version
    jql_query = f'project = {project_key} AND fixVersion = "{version}" ORDER BY issuetype DESC'
    params = {'jql': jql_query, 'expand': 'renderedFields,changelog', 'maxResults': 1000}

    search_api_url = f"{jira_config['base_url']}{SEARCH_API_URL}"
    response = requests.get(search_api_url, headers={
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }, params=params, auth=(jira_config['username'], jira_config['api_token']))

    if response.status_code != 200:
        raise Exception(f"Failed to fetch issues from Jira: {response.status_code} - {response.text}")

    return response.json().get('issues', [])

def generate_issue_markdown(issue):
    # Generate markdown for an individual issue
    issue_key = issue['key']
    issue_summary = issue['fields']['summary']
    issue_type = issue['fields']['issuetype']['name']
    issue_status = issue['fields']['status']['name']
    #issue_description = issue['fields'].get('description', {}).get('content', [{}])[0].get('content', [{}])[0].get('text', 'No description provided.')
    issue_description = md(issue['renderedFields']['description'])

    markdown = f"# {issue_key} - {issue_summary}\n\n"
    markdown += f"**Type**: {issue_type}\n\n"
    markdown += f"**Status**: {issue_status}\n\n"
    markdown += f"## Description\n{issue_description}\n\n"

    pprint.pprint(issue)

    return markdown

def save_issue_to_file(issue, directory='issues'):
    # Ensure the directory exists
    if not os.path.exists(directory):
        os.makedirs(directory)
    
    issue_key = issue['key']
    filename = f"{directory}/{issue_key}.md"
    
    markdown_content = generate_issue_markdown(issue)

    # Write the issue markdown content to a file
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(markdown_content)
    
    print(f"Issue {issue_key} saved to {filename}")

def generate_release_plan_markdown(product_name, version, issues):
    # Header with product and version information
    markdown = f"# {version} Release Plan\n\n"

    # Group issues by epic
    epics = {}
    non_epic_issues = []

    print("Issue count: " + str(len(issues)))

    for issue in issues:
        issue_type = issue['fields']['issuetype']['name']
        issue_summary = issue['fields']['summary']
        issue_key = issue['key']

        if issue_type == "Epic":
            epics[issue_key] = []

    for issue in issues:
        issue_type = issue['fields']['issuetype']['name']
        issue_summary = issue['fields']['summary']
        issue_key = issue['key']
        issue_status = issue['fields']['status']['name']
        epic_link_parent = issue['fields'].get('parent')

        # Create a markdown link to the individual issue file
        issue_link = f"[{issue_key}]({os.path.join('issues', issue_key + '.md')})"

        issue_entry = f"- {issue_link} {issue_summary} ({issue_status})\n"

        if issue_type != "Epic":
            if epic_link_parent:
                epic_key = epic_link_parent['key']
                epics[epic_key].append(issue_entry)
            else:
                non_epic_issues.append(issue_entry)

    # Sort epics alphabetically
    sorted_epics = sorted(epics.items())

    # Write epics and their related issues
    for epic_key, epic_issues in sorted_epics:
        for issue in issues:
            if issue['fields']['issuetype']['name'] == "Epic" and epic_key == issue['key']:
                epic_summary = issue['fields']['summary']
                epic_status = issue['fields']['status']['name']

        markdown += f"## Epic: {epic_key} {epic_summary} ({epic_status})\n"
        markdown += ''.join(epic_issues) + '\n'

    # Write issues that do not belong to an epic
    if non_epic_issues:
        markdown += "## Non-Epic Issues\n"
        markdown += ''.join(non_epic_issues) + '\n'

    return markdown

def main():
    # Command-line argument parsing
    parser = argparse.ArgumentParser(description='Generate a release plan from Jira.')
    parser.add_argument('project_key', help='The Jira project key (e.g., PROJ)')
    parser.add_argument('release_version', help='The release version (e.g., 1.0.0)')

    args = parser.parse_args()

    # Read configuration from config.ini in the current directory
    jira_config = read_config()

    product_name = args.project_key
    version = args.release_version

    # Fetch issues for the given release version
    issues = get_issues_by_version(jira_config, args.project_key, version)

    if not issues:
        print(f"No issues found for release version {version}")
        return

    # Generate and save markdown for each issue
    for issue in issues:
        save_issue_to_file(issue)

    # Generate the Markdown release plan
    markdown = generate_release_plan_markdown(product_name, version, issues)

    # Write the markdown to a file
    output_file = f'release_plan_{version}.md'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(markdown)

    print(f"Release plan for {version} written to {output_file}")

if __name__ == '__main__':
    main()
