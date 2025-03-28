<div align="center">
<p>
  <img title="telegram" width="120" src="https://github.com/user-attachments/assets/ef93936f-f131-4fec-9804-38a3366dd3d9" />
  <img title="javascript" width="120" src="https://github.com/user-attachments/assets/5c6ae4d9-d6f3-40c3-88f1-b35471ad5fc0" />
</p>

# tel-js
If you are in a country where Telegram APIs are blocked for you, this package is your best choice. This package is designed to allow you to communicate with messaging APIs in bots without any problems. You can use this feature for front-end logging systems. This package can work without any dependencies.
<br /><br />
</div> 

## How to install?
This package is very easy to use, you just need to install it first.

```
npm i tel-js
```

Then you need to add it to your project. Like below:

```html
<script type="module">
    import TelJs from "tel-js";
    // other codes ...
</script>
```

The above method is for the case where you are using construction tools like Vite. And if you are not using them, you can proceed with the following methods:

```html
<script type="module">
    import TelJs from "./node_modules/tel-js/index.js";
    // other codes ...
</script>
```

Or if you don't want to install anything, you can use CDNs like below:

```html
<script type="module">
  import TelJS from 'https://cdn.jsdelivr.net/npm/tel-js@latest/index.js';
</script>
```

## How to use?
Let's get to how to use it
We need some information before using it.
You first need to create a bot in Telegram in the @BotFather bot and have its token.
Then you need to add it to a group or channel and get the chat_id of that group or channel or even a conversation and have it too. (For more information on this, you can refer to the Telegram documentation)
Finally, you need to have the token and chat ID as follows:

```
token => "7625382592:AAdX0jkcydTx7NG2e2X3zkUvnOMmh5DeS9s"
chat_id => "-1302142270666"
```

If you've made it this far, congratulations, because you've completed 80% of the steps 🔥🚀🚀

## last stage 🎉🎉
Here you need to create an instance of the class you imported and then give it 
first token 
and second chat_id 
as props respectively.

```html
<script type="module">
  import TelJS from "https://cdn.jsdelivr.net/npm/tel-js@latest/index.js";

  // new TelJS(token, chat_i)
  const telegram = new TelJS(
    "7625185562:AAGX0jfcydTx7NG2erX3zkUvnOMmK5DeS9s", // token
    "-3002192470356" // chat_id
  );
</script>
```

In this way, you have done the initial configuration very correctly. Now let's move on to the message sending stage.
To do this, simply call a function called send on the instance of the class you created with the input of your desired message:

```html
<script type="module">
  import TelJS from "https://cdn.jsdelivr.net/npm/tel-js@latest/index.js";

  // new TelJS(token, chat_i)
  const telegram = new TelJS(
    "7625185562:AAGX0jfcydTx7NG2erX3zkUvnOMmK5DeS9s", // token
    "-3002192470356" // chat_id
  );

  telegram.send("test message").then((result) => {
    console.log(result);
  });
</script>
```

That's it
Also, the result variable is the output of the API and your text should be in the props of the send function.
Another point is that the parse-HTML feature is also enabled and you can use it in your messages
For example:

```javascript
telegram.send("<b>Hello</b>").then((result) => {
    console.log(result);
});
```

Done.🎉🎉
Also, if you have any problems running the package, you can let me know in the issues section. 
🟢🟢
