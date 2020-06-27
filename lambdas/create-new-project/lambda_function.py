from utils import awsHelper as awsUtils
from datetime import datetime
from decimal import Decimal
import uuid
import json

# used when json.dumps cannot by default decode an element
def default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError("Object of type '%s' is not JSON serializable" % type(obj).__name__)

class NULL_NAMESPACE:
    bytes = b''


def handler(event, context):


    required_args_present=False
    try:
        required_args_present = set(['name','description','picture','team','school','tech','college','links','boothNumber']).issubset(set(list(json.loads(event["body"]).keys())))
    except Exception as e:
        return {
        "statusCode" : "400" ,
        "headers" : {
            "Content-Type" : "application/json" ,
            "Access-Control-Allow-Headers" : 'Content-Type' ,
            "Access-Control-Allow-Origin" : "*" ,
            "Access-Control-Allow-Methods" : "POST, OPTIONS" ,
            "Access-Control-Allow-Credentials" : True
        },
        "body": json.dumps({"ERROR":"Error getting body of request, it may not have been passed correctly",
                            "Exception":str(e)})
        }

    if (not required_args_present):
        return {
        "statusCode" : "400" ,
        "headers" : {
            "Content-Type" : "application/json" ,
            "Access-Control-Allow-Headers" : 'Content-Type' ,
            "Access-Control-Allow-Origin" : "*" ,
            "Access-Control-Allow-Methods" : "POST, OPTIONS" ,
            "Access-Control-Allow-Credentials" : True
        },
        "body": json.dumps({"ERROR":"The required arguments [NAME,DESCRIPTION,PICTURE,TEAM,SCHOOL,TECH,COLLEGE,LINKS] are not present"})
        }

    # all the args are present so can put in ddb
    input_data = json.loads(event["body"])
    item={}
    item['name'] = input_data['name']
    item['description'] = input_data['description']
    item['picture'] = input_data['picture']
    item['team'] = input_data['team']
    item['school'] = input_data['school']
    item['tech'] = input_data['tech']
    item['college'] = input_data['college']
    item['links'] = input_data['links']
    item['booth_number'] = input_data['boothNumber']
    item['project_id'] = str(uuid.uuid3(NULL_NAMESPACE, str(datetime.now())+input_data['name']))

    ddb = awsUtils.connect_ddb()
    response=ddb.Table('osu-expo-projects').put_item(Item=item)


    ret = {
        "statusCode" : "200" ,
        "headers" : {
            "Content-Type" : "application/json" ,
            "Access-Control-Allow-Headers" : 'Content-Type' ,
            "Access-Control-Allow-Origin" : "*" ,
            "Access-Control-Allow-Methods" : "POST, OPTIONS" ,
            "Access-Control-Allow-Credentials" : True
        },
        "body": json.dumps( response,default=default)}

    return ret
