from utils import awsHelper as awsUtils
from decimal import Decimal
import uuid
import json

# used when json.dumps cannot by default decode an element
def default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError("Object of type '%s' is not JSON serializable" % type(obj).__name__)


def handler(event, context):

    # ["project_id"]
    required_args_present=False

    try:
        required_args_present = set(['project_id']).issubset(set(list(event["queryStringParameters"].keys())))
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
        "body": json.dumps({"ERROR":"Error getting queryStringParameters of request, it may not have been passed correctly",
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
        "body": json.dumps({"ERROR":"The required queryStringParameter [PROJECT_ID] is not present"})
        }



    # all the args are present so can get
    project_id = event["queryStringParameters"]["project_id"]

    ddb = awsUtils.connect_ddb()
    response=ddb.Table('osu-expo-projects').get_item(Key={'project_id':project_id})


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
