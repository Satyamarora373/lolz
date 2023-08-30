import requests

# Email configuration
sender_email = 'your_email@example.com'
receiver_email = 'receiver@example.com'
subject = 'Test Email'
message = 'This is a test email sent from Python.'

# Outlook REST API endpoint
endpoint = "https://outlook.office365.com/api/v1.0/me/sendmail"

# Create the email content
email_data = {
    "Message": {
        "Subject": subject,
        "Body": {
            "ContentType": "Text",
            "Content": message
        },
        "ToRecipients": [
            {
                "EmailAddress": {
                    "Address": receiver_email
                }
            }
        ]
    }
}

# Send the email using the Outlook REST API
try:
    response = requests.post(endpoint, json=email_data, auth=(sender_email, None))
    if response.status_code == 202:
        print("Email sent successfully!")
    else:
        print("Failed to send email. Status code:", response.status_code)
except Exception as e:
    print("An error occurred:", str(e))
