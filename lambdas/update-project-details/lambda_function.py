from utils import awsHelper as awsUtils
from decimal import Decimal
import json

# used when json.dumps cannot by default decode an element
def default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError("Object of type '%s' is not JSON serializable" % type(obj).__name__)


def handler(event, context):

    required_args_present=False
    try:
        required_args_present = set(['project_id']).issubset(set(list(json.loads(event["body"]).keys())))
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
        "body": json.dumps({"ERROR":"The required argument [project_id] is not present"})
        }


    # all the args are present so can put in ddb
    input_data = json.loads(event["body"])
    name = input_data.get("name", None)
    description = input_data.get("description", None)
    picture = input_data.get("picture", None)
    team = input_data.get("team", None)
    school = input_data.get("school", None)
    tech = input_data.get("tech", None)
    college = input_data.get("college", None)
    links = input_data.get("links", None)
    booth_number = input_data.get("booth_number", None)
    project_id = input_data.get("project_id", None)

    ddb = awsUtils.connect_ddb()
    response=ddb.Table('osu-expo-projects').update_item(
        Key={'project_id':project_id},
        UpdateExpression="SET #NAME_ATTR = :NAME_VAL, #DESC_ATTR = :DESC_VAL, #PICTURE_ATTR = :PICTURE_VAL, #TEAM_ATTR = :TEAM_VAL, #SCHOOL_ATTR = :SCHOOL_VAL, #TECH_ATTR = :TECH_VAL, #COLLEGE_ATTR = :COLLEGE_VAL, #LINKS_ATTR = :LINKS_VAL, #BOOTHNUMBER_ATTR = :BOOTHNUMBER_VAL",
        ExpressionAttributeNames = {
            "#NAME_ATTR":"name",
            "#DESC_ATTR":"description",
            "#PICTURE_ATTR":"picture",
            "#TEAM_ATTR":"team",
            "#SCHOOL_ATTR":"school",
            "#TECH_ATTR":"tech",
            "#COLLEGE_ATTR":"college",
            "#LINKS_ATTR":"links",
            "#BOOTHNUMBER_ATTR":"booth_number"
        },
        ExpressionAttributeValues={
            ":NAME_VAL": str(name),
            ":DESC_VAL": str(description),
            ":PICTURE_VAL": str(picture),
            ":TEAM_VAL": team,
            ":SCHOOL_VAL": str(school),
            ":TECH_VAL": str(tech),
            ":COLLEGE_VAL": str(college),
            ":LINKS_VAL": links,
            ":BOOTHNUMBER_VAL":booth_number
        }
    )


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
