# Workshop 9: Reading and Writing Files

This workshop introduces how we can read (open) and write (save) files from a
Node.js program.

## Expectations

- Everyone should be able to complete Part 1 and Part 2
- Ignore the challenge sections on your first run through
- Once you've finished parts 1 & 2, go back and complete the challenge sections
  if you want to

## Get Started

1. Fork & clone this repo
1. `cd` into it
1. Open it in your editor

## Reminder

For each **bold question** that you come to, write down an answer - either open
up this file (README.md) and add the answers next to the questions there, or add
them to your own notes. If you can't answer the question, try doing some
research, asking a friend, or asking a member of staff.

Also - remember to be commiting your changes with git regularly!

## Part 1: reading & writing text from a file

Open `names.txt` and take a look at what's inside. It's a list of names of Ada
staff - one on each line.

Node has a built in library for working with files. It's called `fs`. Open up
`part-1.js` and add this line at the top to `require` it in:

```js
var fs = require('fs')
```

Fs includes a bunch of functions we can use for working with the file system.
There’s loads you can do - check the documentation here:
https://nodejs.org/api/fs.html

Add the following code to your file:

```js
var fileContents = fs.readFileSync('names.txt')
console.log(fileContents)
```

Before you run the code, read it carefully. **What do you think it’ll do?**

It will return a buffer of binary data because we have not specified the encoding type.

Run the code in your terminal with `node part-1.js`. **What happened? Was it
what you expected?**

It returned the word "Buffer" along with a series of bytes from the file.


You’ll probably find that you get something with the word ‘`Buffer`’ and a bunch
of weird letters and numbers. These are the bytes from our file, the raw data
stored on your computers hard disk. Not the words in the file that we might have
been expecting. This is because we didn’t tell Node what sort of information was
in the file.

Add `'utf-8'` as a second parameter to `readFileSync`, like this:

```js
var fileContents = fs.readFileSync('names.txt', 'utf-8')
```

Run your code and see what the difference is. So some research to answer these
questions:

- **What does utf-8 mean**
UTF-8 (Unicode Transformation Format) is character encoding, capable of encoding all 1,112,064 valid code points in Unicode. The -8 is the code unit which represents 8-bits.
- **Why does adding it change what our code does?**
Adding this encoding type as a parameter now displays the list of names because by default, the method returns a buffer.
- Extra: **what other things could we try adding instead of `utf-8`?**
We can add utf-16 as the encoding.

Now, `readFileSync` should be returning a _string_ containing the contents of
our file.

Complete the following tasks:

- Split the file string into an _array of lines_
  - If you're unsure about this, try searching for something like 'javascript
    split string into lines'
- Reverse the array of lines
  - Again, if you're not sure about this, try a search engine! 'javascript
    reverse array' is probably a good bet
- Join the array of lines back together again
  - Try coming up with your own search for this one ;)

Now we’ve reversed the names, we can look at _writing_ (saving) the file.

There’s a method called `fs.writeFileSync` that works exactly the same as
`fs.readFileSyn`c - with an extra input in the middle for the file contents. It
looks like this:

```js
fs.writeFileSync(nameOfFile, fileContents, fileEncoding)
```

Use `fs.writeFileSync` to write the reversed names to a file called
‘names-reversed.txt’.

When you run your code, you should see this file get created and see the
(reversed) list of names inside. Try changing your original names.txt and
running your code again - you should see your names-reversed.txt file change
each time.

### Part 1 Challenge

Change your code so that it reads the names from the file, and writes a **new
file for each name** containing the reversed name - e.g. Alex.txt would containe
'xelA'

## Bonus tip - you need this for part 2

Using `for (var i = 0; i < length, i++)` to loop over things all the time gets
pretty tedious. JavaScript gives us a shortcut:

```js
for (var name of arrayOfNames) {
  console.log(name)
}
```

Try it out!

## Part 2: reading & writing structured data

In this exercise, we’re going to be working with JSON. Do some research and
answer the following questions:

- **What is JSON?**
JSON stands for JavaScript Object Notation. It is a file format that uses human-readable text to transmit data objects consisting of key-value pairs and it is commonly used for asynchronous communications between browser and server.
- **What’s it used for?**
It is ued to transmit data objects between the client and the browser.
- **What does it look like?**
It is an object but every key and value are wrapped in double quotes.
- **Where have we seen it before?**
As Object Literals.

Take a look at `shopping-basket.json` and familiarise yourself with it's
contents. This is JSON data for a shopping cart. It is an object with one
attribute - `basket`. Basket is an _array of objects_. Each object in the array
has three attributes - `name`, `price`, and `quantity`.

**Add code to part-2.js to read the contents of the file to a string and
console.log the result. You might need to refer to the code you just wrote in
part 1.**

The data is still a string - before we can work with it as objects & arrays, we
need to _parse_ it. Do some research: **what does parsing mean?**
Parsing in programming means taking an input and converting it into their syntactic roles. An example of this would be parsing a JSON object which is wrapped between double quotes as a string and converting it into an object and their properties as respective data types such as arrays.

Replace your console.log with lines of code like this:

```js
var data = JSON.parse(fileContents)
console.log(data)
```

**What do you think will change?**

It will show the data as a JavaScript object and the properties are also shown correctly.

Run the code. **What changed? Why?**

The format of the data has changed. It is no longer shown as a string but now as a JavaScript object. This is because we called JSON.parse() which is an in-built JavaScript method that converts a string into their respective roles.

We can _loop_ over each item in the basket with the following code:

```js
for (var item of data.basket) {
  console.log(item.name)
}
```

**How does this loop work?**

It is using a "for-of" loop to iterate through the basket array. The item variable is temporarily representing each item of the basket when the loop is being executed and every time an iteration is made, the program outputs the name.

**What happens when we change basket in the code? Why?**

The program will throw an exception because the only property the data object has is "basket". Accessing any properties that aren't defined in the data object will throw an exception.

Modify your program so that it prints out the quantity and total cost (price ×
quantity) of each item. **Check your answers against this tweet:**

![dril](img/wint.png)

Have your program calculate and print the total cost of the shopping basket.

The opposite of parsing - turning structured data back into a string - doesn’t
really have a name. JavaScript (and a few other languages) use `stringify`.

This code will convert a JavaScript object into a JSON string:

```js
var jsonString = JSON.stringify(data, null, 2)
```

You can remove the null, 2; but without them the JSON all gets printed on one
line, which is difficult to read.

Change your code as well as printing the items and the total, it **changes the
quantity of candles to 10**. Then, **save the data back to a file called
new-basket.json**.

<details><summary>Hint (click to expand)</summary><p>

Pseudo code for changing the quantity of candles to 10 might look like:

```
for every item in the basket:
  if the name of the item is candle:
    set the quantity of the item to 10
```

</p></details>

### Part 2 Challenge

Modify the AdaCat workshop from yesterday to be able to save/load a cat from a
JSON file.
