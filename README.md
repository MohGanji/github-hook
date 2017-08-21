# github-hook
a small express-js web server for github webhooks

## Usage
#### 1. Clone
clone the project into your server and install required npm packages
```
remote$ git clone https://github.com/MohGanji/github-hook.git
remote$ cd github-hook
remote$ npm install
```
#### 2. Configs
you should edit the configs.json file, so that the fields have proper value:
* **__secretToken__**: This is the token you specify when creating a webhook in gitlab
* **__email__**: (**NOTE: this does not work right now**) if there is a problem, details will be emailed to the sysAdmin
* **__shellCommand__**: preferably this should be an absolute path to a shell script(.sh) that is executable.

for exmaple this is a sample config.json file:

__configs.json:__
```
{
    "secretToken": "thisIsASampleSecretToken",
    "email": "mfg1376@gmail.com",
    "shellCommand": "/var/www/html/Server/githook.sh"
}
```

#### 3. Write a shell script
now create a shell script in the directory you specified in the configs.json and put what you want to do when there is a push event in your gitlab repository:
for example for githook.sh:

__/var/www/html/Server/githook.sh:__
```
cd /var/www/html/Server
git checkout master
git pull > /var/log/gitpull.log 2>&1
mocha
stat=$?
if [ $stat == 0 ]; then
	echo "all tests passed successfully"
	
	# kill the previous instance of node server
	pid=`cat /var/log/nodePID.log | cut -f2 -d' '`
	kill -2 $pid

	# run the updated node server on port 3000
	PORT=3000 node /var/www/html/Server/bin/www >> /var/log/myProject.log 2>&1 & > /var/log/nodePID.log 2>&1 
else
	echo "$stat tests failed"
fi

```
then make it executable:
```
chmod +x /var/www/html/Server/githook.sh
```

#### 4. Run the server
now run the server in background to do the job:
```
remote$ cd path/to/this/repo
remote$ PORT=3003 node ./bin/www >> logfile.log 2>&1 &
```

## To Do
- [x] create a proper documentation
- [ ] handle secret token
- [ ] email the sys admin if there was a problem with pulling
