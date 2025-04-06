# pokemone-api
Pokémon Explorer is a mini web app that lets you search for Pokémon, view their stats using the PokéAPI, and save your favorite ones to a cloud database using AWS DynamoDB. It's built with Express.js and hosted on an AWS EC2 server.

1. Launch an EC2 Instance
Go to the AWS EC2 Console and click Launch Instance.

Choose an OS (Amazon Linux 2 or Ubuntu) and select a t2.micro instance (free tier eligible).

Configure the Security Group to allow ports 22 (SSH), 80 (HTTP), and 3000 (app).

Download the .pem key file.

2. Connect to EC2
Open your terminal and connect using SSH:

bash
Copy
Edit
ssh -i "your-key.pem" ec2-user@your-ec2-ip
3. Install Node.js and Git on EC2
For Amazon Linux 2:

bash
Copy
Edit
sudo yum update -y
curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs git
For Ubuntu, use sudo apt update -y and sudo apt install -y nodejs npm git.

4. Upload Your Project
On your local machine, zip the project and copy it to your EC2 instance:

bash
Copy
Edit
zip -r project.zip .
scp -i "your-key.pem" project.zip ec2-user@your-ec2-ip:~
Then, on EC2:

bash
Copy
Edit
unzip project.zip
cd pokemon-aws-express
npm install
5. Create the .env File on EC2
Inside your project directory, create a .env file:

bash
Copy
Edit
nano .env
Paste in the following (replace placeholders with your values):

env
Copy
Edit
PORT=3000
AWS_REGION=your-region
AWS_ACCESS_KEY=your-access-key
AWS_SECRET_KEY=your-secret-key
Save and exit.

6. Start the App on EC2
Start your application:

bash
Copy
Edit
npm start
Now, open your browser and visit:
http://your-ec2-ip:3000

📌 Additional Notes
Security: Never commit your .env file to version control.
Add .env to your .gitignore:

bash
Copy
Edit
node_modules/
.env
Future Enhancements:

Add user login with JWT.

Deploy the frontend on AWS S3 or Amplify.

Expand Pokémon details to include abilities, evolutions, etc.

