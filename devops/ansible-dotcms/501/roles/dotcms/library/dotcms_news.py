#!/usr/bin/python

ANSIBLE_METADATA = {
    'metadata_version': '1.1',
    'status': ['preview'],
    'supported_by': 'community'
}

DOCUMENTATION = '''
---
module: dotcms_news

short_description: Module to manage DotCMS news items

version_added: "2.4"

description:
    - "The dotcms_news module creates and updates news articles in a DotCMS server."

options:
    server_url:
        description:
            - URL for the DotCMS server
        required: true
    username:
        description:
            - DotCMS account user with rights to update content
        required: true
    password:
        description:
            - DotCMS account password
        required: true
    host_folder:
        description:
            - Site within DotCMS to load content
        required: true
    news_url:
        description:
            - Path under which to publish news item
        required: true
    publish_date:
        description:
            - Date (M/D/Y) of publication
        required: true
    byline:
        description:
            - Author name
        required: true
    title:
        description:
            - News item title
        required: true
    story:
        description:
            - News item content
        required: true

author:
    - Alan Hohn
'''

EXAMPLES = '''
# Create or update a news item
- name: Report sky status
  dotcms_news:
    server_url: "http://localhost:28080"
    username: "admin@dotcms.com"
    password: "admin"
    host_folder: "demo.dotcms.com"
    news_url: "sky-is-falling"
    publish_date: "01-01-1970"
    byline: "Chicken Little"
    title: "The Sky Is Falling"
    story: "A piece of it hit me on the <b>head!</b>"
'''

RETURN = '''
details:
    description: DotCMS server response, if any
    type: str
identifier:
    description: DotCMS UUID for item
    type: str
inode:
    description: DotCMS UUID for item content
    type: str
'''

from ansible.module_utils.basic import AnsibleModule
import json
import requests

def find_news(module):
    headers = {
        "Content-Type": "application/json"
    }

    query = "+structurename:news +news.urltitle:%s/sortby/modDate/limit/1/offset/0" % module.params['news_url']

    auth = requests.auth.HTTPBasicAuth(module.params['username'], module.params['password'])
    url = "%s/api/content/render/false/query/%s" % (module.params['server_url'], query)
    response = requests.get(url, auth=auth, headers=headers)
    if response.status_code == 404:
        return None
    elif response.status_code < 200 or response.status_code > 299:
        raise requests.exceptions.RequestException(response.content)
    else:
        return response.json()['contentlets'][0]

def is_changed(module, news):
    if module.params['byline'] != news['byline']:
        return True
    if module.params['title'] != news['title']:
        return True
    if module.params['story'] != news['story']:
        return True


def run_module():
    # Define the argument specification
    module_args = dict(
        username=dict(type='str', required=True),
        password=dict(type='str', required=True, no_log=True),
        server_url=dict(type='str', required=True),
        host_folder=dict(type='str', required=True),
        news_url=dict(type='str', required=True),
        publish_date=dict(type='str', required=True),
        byline=dict(type='str', required=True),
        title=dict(type='str', required=True),
        story=dict(type='str', required=True)
    )

    # Declare the module results
    result = dict(
        changed=False,
        details='',
        inode='',
        identifier=''
    )

    # Load the module and populate the parameters
    module = AnsibleModule(
        argument_spec=module_args,
        supports_check_mode=True
    )

    try:
        # Used for ansible-playbook --check
        if module.check_mode:
            return result

        headers = {
            "Content-Type": "application/json"
        }

        data = {
            "stName": "News",
            "sysPublishDate": module.params['publish_date'],
            "byline": module.params['byline'],
            "hostfolder": module.params['host_folder'],
            "urlTitle": module.params['news_url'],
            "title": module.params['title'],
            "story": module.params['story']
        }

        news = find_news(module)
        if news is not None:
            result['inode'] = news['inode']
            result['identifier'] = news['identifier']
            if not is_changed(module, news):
                module.exit_json(**result)
            else:
                data['identifier'] = news['identifier']

        auth = requests.auth.HTTPBasicAuth(module.params['username'], module.params['password'])
        url = "%s/api/content/publish/1" % module.params['server_url']
        response = requests.put(url, json.dumps(data), auth=auth, headers=headers)

        result['details'] = response.content

        if response.status_code < 200 or response.status_code > 299:
            module.fail_json(msg="Failed (%s)" % response.status_code, **result)

        result['inode'] = response.headers['inode']
        result['identifier'] = response.headers['identifier']
        result['changed'] = True

        module.exit_json(**result)

    except requests.exceptions.RequestException as e:
        result['details'] = str(e)
        module.fail_json(msg="Connection to DotCMS failed", **result)

def main():
    run_module()

if __name__ == '__main__':
    main()
