#### Project code and deployment management with node js
* command to generate an email to me sent to managers of all the Jira tickets your team has deployed
* command to deploy build to a server
* command to deploy static assets to S3 
* command to get the size of the directory being deployed to the server
* command to track the git branch / commit / and time of last deployment
* command to replace relative static scripts in index.html with the hosted scripts on S3
* command to fetch all the tickets assigned to developer in Jira



before generating an email fetch tickets using 

`npm run fetch:tickets`

##### create a .env with the below variables and place in the root of this directory
```apacheconfig
JIRA_USERNAME=jirausername
JIRA_PASSWORD=jirapassword
JIRA_URL=jiraurl
EMAIL_PASSWORD=email_password
EMAIL_ACCOUNT=name@companyname.com
```
