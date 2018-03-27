Creating your first script

Note: To follow along with this tutorial, you need to have the appropriate application installed on your computer.

**Create the script** 

Create a text file in the same folder as your application.
Open this file, and "Save-as" - call is "Tutorial.js"

**Add the basics**

Copy and paste the following into the file:

```javascript
function setup(){

}

function start(){

}

function update(){

}
```

This is the basic shell of a script.  You'll notice there are three different things in here - setup, start and update.  

* setup 

This is where you put things that you want to happen before your script starts running at all.  This includes things like download images or models that you want to be available as soon as you run your script.

* start 

This is what happens as soon as your script starts running - after your things in setup have loaded.

* update 

This happens at every frame - every game step.  For example, if you tell an object to move a little bit inside of update, it will do    so at every gamestep, and move continuously.

**Hello, World**

To make sure our script is hooked up and working, we are going to add some simple output.

In start, we are going to turn on the log, which we can write messages to and also use to see if there is anything going wrong.  We will also write a message, to show us that everything is set up correctly.  The lines added are shown below.

<pre lang="javascript">
function setup(){

}

function start(){
  <b>showLog();</b>
  <b>log("Hello, world!");</b>
}

function update(){

}
</pre>

**Testing**

Save this file, and open up the application.  When it's open, click once to open up the menu.  You should see a bunch of scripts available, like so:

TODO:IMAGE HERE

If you move up to the firts one (you can use the arrow keys), you should see that is your tutorial script.  Face the script and click, and it will run - you should see your message pop up on the screen.


