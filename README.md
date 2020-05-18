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
sudo apt install tor # should auto run as service after install
sudo systemctl status tor # check status of tor service
```

Then, we need to install [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) in order to run the application:

```bash
sudo apt update
sudo apt install nodejs npm # both installed in one command
```

Finally, we clone the application from this git repository, navigate into the cloned folder, install all dependencies and then run the application:

```bash
git clone https://github.com/jared2710/anon-chat-local-cos720.git
cd anon-chat-local-cos720
npm install .
node app -h
```

## Usage
This is a command line application, so we run it with a command and some flags. See the output of the help command below for all possible options:

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

## Contribution
This application was created by Jared O'Reilly, a Computer Science Honours student at the University of Pretoria. Besides the npm packages, everything was designed, coded and tested by him. Thanks must go to the authors of the [tor-request](https://www.npmjs.com/package/tor-request) package, for making the use of the Tor network a breeze.

## Uninstallation

You can either uninstall tor or stop the service from running (with the option to start it again). This is done with the following commands on Ubuntu:

```bash
sudo apt purge tor # completely remove tor and all configuration files
sudo systemctl start tor # start the tor service
sudo systemctl status tor # check if the tor service is running
sudo systemctl stop tor # stop the tor service from running
```

Then, we need to install [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) in order to run the application:

```bash
sudo apt update
sudo apt install nodejs npm # both installed in one command
```

Finally, we clone the application from this git repository, navigate into the cloned folder, install all dependencies and then run the application:

```bash
git clone https://github.com/jared2710/anon-chat-local-cos720.git
cd anon-chat-local-cos720
npm install .
node app -h
```
