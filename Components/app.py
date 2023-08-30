from flask import Flask, render_template, request

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

app = Flask(__name__)

def send_email(subject, message, to_email):
    # Email configuration
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    sender_email = "your_email@gmail.com"
    sender_password = "your_password"  # Use app-specific password for security

    # Create the MIME object
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = to_email
    msg['Subject'] = subject

    # Attach the message to the email
    msg.attach(MIMEText(message, 'plain'))

    # Establish a connection to the SMTP server
    server = smtplib.SMTP(smtp_server, smtp_port)
    server.starttls()

    # Log in to the SMTP server
    server.login(sender_email, sender_password)

    # Send the email
    server.sendmail(sender_email, to_email, msg.as_string())

    # Close the connection
    server.quit()

@app.route('/', methods=['GET', 'POST'])
def send_email_page():
    if request.method == 'POST':
        subject = request.form['subject']
        message = request.form['message']
        to_email = request.form['to_email']

        try:
            send_email(subject, message, to_email)
            return "Email sent successfully!"
        except Exception as e:
            return f"An error occurred: {str(e)}"

    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)
