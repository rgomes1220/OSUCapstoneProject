from botocore.exceptions import ClientError
import boto3


# returns an s3 resource object
# Credentials are retrieved in this precedence https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html#config-settings-and-precedence
def connect_s3():

    try:
        s3 = boto3.resource('s3')
        print("Connected to a an s3 resource")
        return s3
    except ClientError:
        print("Error connecting to S3, exiting")
        return None


# gets reqeusted content from s3 and returns as utf8 string
# PARAMS: the s3Resource, bucket, and location (key)
# RETURNS: utf8 string of the s3 content
def get_s3_content_as_string(s3Resource, bucket, location):

    try:
        folder = s3Resource.Bucket(bucket)
        file = folder.Object(location)
        text  = file.get().get("Body").read().decode("utf-8")

        return text

    except ClientError:
        print("Error retreiving file")
        return "Error retreiving file"

# tries to connect to a dynamodb resource. Returns the resource if successful. Otherwise error
# Credentials are retrieved in this precedence https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html#config-settings-and-precedence
def connect_ddb():
    try:
        ddbResource = boto3.resource('dynamodb')
        return ddbResource
    except ClientError:
        print("Error connecting to ddb")
        return None
