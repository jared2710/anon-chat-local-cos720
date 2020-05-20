# anon-chat-local-cos720
The client-side command-line application for an anonymous chatroom, which forms part of a COS720 project at the University of Pretoria in South Africa. See [anon-chat-cos720](https://github.com/jared2710/anon-chat-cos720/) for the server-side NodeJS API which provides the chatroom for this application.

## Environment
This code was designed for and runs in Ubuntu Linux. Specifically, it was run on an Ubuntu VM through Virtualbox on a Windows host. The Tor network is used to connect to the chatroom server from this Ubuntu machine, so the chatroom is connected to anonymously.

The VM was given 2.5GB of RAM, 32MB of video memory and 20GB of HDD, and networking was through a Bridger Adapter. These specs probably are not important, but are included anyway, for if all else fails.

This application is a NodeJS project, which is controlled using the command line. Therefore, NodeJS and npm must be installed on the Ubuntu machine - instructions for this are included in Installation.

## Installation

Firstly, we need to install a [tor](https://2019.www.torproject.org/docs/debian.html.en) client on the Ubuntu machine. To install tor, and check that the service is running on your machine, use the following commands:
```bash
sudo apt update
sudo apt install tor          # should auto run as service after install
sudo systemctl status tor     # check status of tor service
```

Then, we need to install [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) in order to run the application:
```bash
sudo apt update
sudo apt install nodejs npm   # both installed in one command
```

If you do not have git installed already on your Ubuntu machine, you can install it with:
```bash
sudo apt update
sudo apt install git          # only pro coders install this bad boy
```

Finally, we clone the application from this git repository, navigate into the cloned folder, install all dependencies and then run the application:
```bash
git clone https://github.com/jared2710/anon-chat-local-cos720.git
cd anon-chat-local-cos720
npm install .                 # commander, fs, inquirer and tor-request are installed
node app -h
```

## Usage
This is a command line application, so we run it with a command and some flags. We can see all possible options to use with the command by using the help flag, as shown below:
```bash
$ node app -h
WELCOME TO ANON_CHAT: A project for COS720
Usage: app [options]

Options:
  -V, --version       output the version number
  -f, --fetch         fetch and display all joinable chatrooms
  -j, --join [room]   join a room to see and send messages
  -h, --help          display help for command
```

We can see the current version of this application using the version flag:
```bash
$ node app -v
WELCOME TO ANON_CHAT: A project for COS720
1.0.0
```

Now, we start to communicate with the chatroom server. We can see all available rooms which we can join by using the fetch flag:
```bash
$ node app -f
WELCOME TO ANON_CHAT: A project for COS720

Fetching all available chatrooms...
ALL AVAILABLE CHATROOMS:
fortnite
room456
ubuntufans
```

Finally, we can join one of these chatrooms by using the join flag and supplying the room name:
```bash
$ node app -j fortnite
WELCOME TO ANON_CHAT: A project for COS720

Joined chatroom fortnite!

Fetching messages from chatroom fortnite...
MESSAGES IN CHATROOM fortnite:
- Angel Dorami Grazili: (2020-05-18 18:09:10) hello there
- Angel Dorami Grazili: (2020-05-18 18:09:19) anyone?
- Clive Edward Hokku: (2020-05-18 18:09:29) i am here!!!

? Select option:
Refresh messages (r)
Send message and refresh (s)
New identity (i)
Quit (q)
> 
```

We can now interact with this chatroom entering one of the provided options:
- r : refresh the messages from the chatroom, i.e. fetch the messages
- s : send a message to the chatroom as the current identity and then refresh the messages
- i : scrap the current identity and create a new one for use on the server
- q : leave the chatroom and go back to the command line

After choosing one of the options and the result being displayed, the choices will be displayed again, until q is typed (quit).

## Uninstallation

You can either uninstall tor entirely or stop the service from running (with the option to start it again). This is done with the following commands on Ubuntu:
```bash
sudo apt remove tor           # remove tor but keep configuration files
-- OR --
sudo apt purge tor            # completely remove tor and all configuration files
-- OR --
sudo systemctl start tor      # start the tor service
sudo systemctl status tor     # check if the tor service is running
sudo systemctl stop tor       # stop the tor service from running
```

You can also uninstall NodeJS and npm in much the same way as uninstalling tor:
```bash
sudo apt remove nodejs npm    # remove nodejs and npm but keep configuration files
-- OR --
sudo apt purge nodejs npm     # completely remove nodejs and npm and all configuration files
```

You will probably want to keep git installed, but in case you don't, you can uninstall it like this:
```bash
sudo apt remove git           # remove git but keep configuration files
-- OR --
sudo apt purge git            # completely remove git and all configuration files
```

A bunch of packages will not be explicity uninstalled from this removal/purging, and they may not be needed by any other packages you have installed. You can automatically remove them using apt's autoremove command, like so:
```bash
sudo apt autoremove           # remove any of the leftover packages
```

Finally, navigate to the directory that contains the cloned anon-chat-local-cos720 directory, and run the following command to delete the anon-chat-local-cos720 directory:
```bash
rm -rf anon-chat-local-cos720  # delete the directory cloned to this machine
```

## Contribution
This application was created by Jared O'Reilly, a Computer Science Honours student at the University of Pretoria. Besides the npm packages, everything was designed, coded and tested by him. Thanks must go to the authors of the [tor-request](https://www.npmjs.com/package/tor-request) package, for providing a simplified interface to the Tor network, as well as to the [random-name](https://github.com/dominictarr/random-name) project, for providing a list of 21986 names in JSON format which were used in pseudonym creation.
