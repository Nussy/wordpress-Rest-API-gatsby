- [Make your WordPress Rest API queries easy with GraphQL and Gatsby](#make-your-wordpress-rest-api-queries-easy-with-graphql-and-gatsby)
  - [Requirements](#requirements)
  - [WordPress](#wordpress)
  - [Install the Gatsby](#install-the-gatsby)
    * [Explore quickly what is installed](#explore-quickly-what-is-installed)
      + [Folders](#folders)
      + [Files](#files)
    * [Create a page with Gatsby](#create-a-page-with-gatsby)
    * [Link WordPress to Gatsby](#link-wordpress-to-gatsby)
  - [Pull the content with GraphQL](#pull-the-content-with-graphql)
    * [Query all posts and pages](#query-all-posts-and-pages)
  - [Display all posts to the front-end](#display-all-posts-to-the-front-end)
      + [What did we?](#What-did-we?)
  - [Bonus: Pull ACF, Menus and Widgets](#bonus-pull-acf-menus-and-widgets)
    * [ACF](#acf)
    * [Menus](#menus)
  - [Build a prodution version](#build-a-prodution-version)
  - [Deploy to production with Surge](#deploy-to-production-with-surge)
  - [Credits](#credits)

# Make your WordPress Rest API queries easy with GraphQL and Gatsby

With the web ecosystem steadily moving towards Javascript and React, let's talk about GraphQL as an easier way to make WP Rest API queries. During this session, we will discuss how to pull, sort, organize and optimize your content from WordPress to React using GraphQL, the data query language developed by Facebook.


![Gatsby folders](https://media3.giphy.com/media/wi8Ez1mwRcKGI/giphy.gif?cid=790b76115d2fc47f366d694f36f7bac7&rid=giphy.gif)

## Requirements

- [Install Chrome](https://www.google.com/search?q=install+chrome&oq=install+chrome&aqs=chrome..69i57j69i60j0l4.1696j0j7&sourceid=chrome&ie=UTF-8)

  You can use the browser of your choice to follow this workshop, but Chrome is the one I'm using.

- [Install VSCode](https://code.visualstudio.com/download)

  You can also use the IDE of your choice, but I recommend you to install VSCode. It's easy to use, works very well with JavaScript and a built-in terminal (that you will have to use).

- [Install NodeJS and NPM](https://nodejs.org/en/)

  NodeJS is not a framwork. It's a JavaScript runtime, a low-level server environment. It is closer to C than languages ​​interpreted as PHP, Ruby or Python.
  Choose the LTS (Long Terme Support) version.

- Install NPM

  NPM (Node Package Manager) makes it easy for JavaScript developers to share and reuse code, and makes it easy to update the code that you’re sharing, so you can build amazing things.
  It's distributed with Node.js, which means that when you download Node.js, you automatically get npm installed on your computer.

  To check if you have Node.js installed, run this command in your terminal:

  ```sh
  node -v
  ```

  To confirm that you have npm installed you can run this command in your terminal:

  ```sh
  npm -v
  ```

  Instead of using NPM, you can use [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable) as well.

- [Install GIT](https://git-scm.com/download/mac)

  Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.
  You will need to be able to generate website with Gatsby.
  :warning: If you are not able to install it, don't worry, there is a gatsby sarter available in this tutorial named `gatsby-starter`. Download it, then do the rest of the workshop inside this project.

#### :star2: Extra: [Install NVM](https://github.com/nvm-sh/nvm)

<details><summary>How install NVM</summary>
<p>
  NVM means "Node Version Manager". It's a:

  > Simple bash script to manage multiple active node.js versions. — NVM, Github

  Once it's installed, you may have to restart your terminal.
  You can install the wanted NodeJS version and use it like this:

  ```sh
  nvm install 10.16.0
  nvm alias default 10.16.0
  ```
  You can install any nodeJS version you want and use it like that. For this workshop, we will be using the **NodeJS version 10.16.0**.

  After running these commands, you might need to open a new shell for them to take effect.
</p>
</details>

## WordPress

<img src="./assets/wp-logo.png" width="100" height="100">

You will not need to install a WordPress. You can use this url `wcpboston.eelab.space`.

Something very cool with Gatsby is that you can very easily change the WordPress to the one you want just by changing one line in your code.


## Install the Gatsby

<img src="./assets/gatsby-logo.png" width="100" height="100">

Gatsby is a **React-based, GraphQL powered, static site generator**. What does that even mean?  Well, it weaves together the best parts of React, webpack, react-router, GraphQL, and other front-end tools in to one very enjoyable developer experience. Don’t get hung up on the moniker "static site generator".  That term has been around for a while, but Gatsby is far more like a modern front-end framework than a static site generator of old.

It uses powerful preconfiguration to build a website that uses only static files for incredibly fast page loads, service workers, code splitting, server-side rendering, intelligent image loading, asset optimization, and data prefetching.

You code and develop your site, Gatsby transforms it into a directory with a single HTML file and your static assets. This folder is uploaded to your favorite hosting provider, and voila.

In order to generate a Gatsby website, we will use Gatsby CLI.
First, from the terminal, do:

```sh
npm install -g gatsby-cli
```

Then, to generate the website, go to your favorite location, then do:

```sh
gatsby new workshop-wordpress-gatsby-react
```

Then, move to this directory

```sh
cd workshop-wordpress-gatsby-react
```

Install dependencies:

```sh
npm install
```

And finally, to start the development server, do:

```sh
gatsby develop
```

And now, your website will be available to [http://localhost:8000/](http://localhost:8000/). <br />
:warning: If it doesn't work, you probably have to rebuild npm by doing: `npm rebuild`.

### Explore quickly what is installed

![Gatsby folders](/assets/folders.png)

#### Folders

- **.cache/**: This folder is an internal cache created automatically by Gatsby. The files inside this folder are not meant for modification. Should be added to the .gitignore file if not added already.
- **node_modules/**: All modules installed by the package.json file. This folder is ignored by git.
- **public/**: This folder is the build directory. It is also ignored by git.
- **src/**: Here is where the magic happens. You will find everything you need to build the website inside  this folder. =>

![Gatsby src folders](/assets/src-folders.png)

- **components/**: they are the building blocks of any React app. It’s a JavaScript class or function that optionally accepts inputs i.e. properties(props) and returns a React element that describes how a section of the UI (User Interface) should appear.
- **pages/**: Files in this folder become pages automatically with paths based on their file name. Here is the full [documentation](https://www.gatsbyjs.org/docs/recipes/#creating-pages).
- **templates/**: You don't have this folder at the beginning but it will contains templates for programmatically creating pages. Here is the full [documentation](https://www.gatsbyjs.org/blog/2019-05-02-how-to-build-a-blog-with-wordpress-and-gatsby-part-3/#creating-a-page-template)

#### Files

- **gatsby-browser.js**: This is where you put your custom JavaScript. You will have to use Gatsby browser API to make it works. Here is the [documentation](https://www.gatsbyjs.org/docs/browser-apis/).
- **gatsby-config.js**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. Here is the full [documentation](https://www.gatsbyjs.org/docs/gatsby-config/).
- **gatsby-node.js**: This is where you will customize your path, create your page, your single page (files in template folder) … Here is the full [documentation](https://www.gatsbyjs.org/docs/node-apis/).
- **gatsby-ssr.js**: This file is where Gatsby expects to find any usage of the Gatsby server-side rendering APIs. We are not using it but here is the full [documentation](https://www.gatsbyjs.org/docs/ssr-apis/).
- **package.json**: This is where you will add all your modules and scripts that you need for you website.

### Create a page with Gatsby

Create a page with Gatsby is very simple, any React component defined in `src/pages/*.js` will automatically become a page.

For instance, let's create a page called `posts.js` and past the following code into it:

```javascript
import React from "react"

export default (props) => {
  return (
    <h1>Posts page</h1>
  )
}
```

If the server is still running (otherwise, at the root project folder, run the following command from the terminal `gatsby develop`), you can now navigate to `http://localhost:8000/posts/` and your new page will be accessible.

### Link WordPress to Gatsby

For that, we will have to install a new Gatsby plugin, **[gatsby-source-wordpress](https://www.gatsbyjs.org/packages/gatsby-source-wordpress/)**. It's very simple, open a new terminal window at the root the project and just do the installation by this simple command line:
(The **--save** tag means that a new line with the plugin slug and his version will be added to the package.json file)

```sh
npm install --save gatsby-source-wordpress
```

Once you've installed the plugin, open `gatsby-config.js` and paste the following code in the plugins array, at ligne 30 (it's part for the documentation but with only what we need):

```javascript
{
  resolve: "gatsby-source-wordpress",
  options: {
    /*
    * The base URL of the Wordpress site without the trailingslash and the protocol. This is required.
    * Example : 'gatsbyjsexamplewordpress.wordpress.com' or 'www.example-site.com'
    */
    baseUrl: "wcpboston.eelab.space", // or your custom WordPress url
    // The protocol. This can be http or https.
    protocol: "https",
    // Indicates whether the site is hosted on wordpress.com.
    // If false, then the assumption is made that the site is self hosted.
    // If true, then the plugin will source its content on wordpress.com using the JSON REST API V2.
    // If your site is hosted on wordpress.org, then set this to false.
    hostingWPCOM: false,
    // If useACF is true, then the source plugin will try to import the Wordpress ACF Plugin contents.
    // This feature is untested for sites hosted on Wordpress.com.
    // Defaults to true.
    auth: null,
    useACF: true, // Allows to pull ACF fields
    // Set verboseOutput to true to display a verbose output on `npm run develop` or `npm run build`
    // It can help you debug specific API Endpoints problems.
    verboseOutput: false,
    // Exclude specific routes using glob parameters
    // See: https://github.com/isaacs/minimatch
    // Example:  `["/*/*/comments", "/yoast/**"]` will exclude routes ending in `comments` and
    // all routes that begin with `yoast` from fetch.
    excludedRoutes: ["/*/*/comments", "/yoast/**"],
    // use a custom normalizer which is applied after the built-in ones.
    normalizer: function({ entities }) {
      return entities
    },
  },
},
```

We are now able to pull data into Gatsby from WordPress using the WordPress REST API.
NOTE: Every time you modify this file, you will have to restart the server. Press `control+c` (`ctrl+c` for windows) to stop the server if it's still running, then:

```sh
gatsby develop
```

#### :star2: Extra: usefull plugins

By default, WordPress don't add data from ACF, Menus, WPLM... in his REST-API so you will have to install a few plugins to your WordPress in order to be able to have those data available with GraphQL.

<details><summary>Show usefull plugins</summary>
<p>

- **ACF**

  You will have to first, set the `useACF` property to `true` from `gatsby-source-wordpress` settings in `gatsby-config.js` file, and secondly, have the plugin [acf-to-rest-api](https://github.com/airesvsg/acf-to-rest-api) installed in WordPress.

- **Menus**

  You will have to add the plugin [wp-api-menus](https://wordpress.org/plugins/wp-api-menus/) which gives you the menus and menu locations endpoint.

- **WPML**

  You will have to add the plugin [wpml-rest-api](https://github.com/shawnhooper/wpml-rest-api) which adds the current locale and available translations to all post types translated with WPML.

- **YOAST**

  You will have to add the plugin [wp-api-yoast-meta](https://github.com/maru3l/wp-api-yoast-meta) which allows you to pull the <em>yoast_meta: {...}</em>

</p>
</details>

## Pull the content with GraphQL

<img src="./assets/graphql-logo.png" width="100" height="100">

GraphQL is a query language (the QL part of its name). If you’re familiar with SQL, it works in a very similar way. Using a special syntax, you describe the data you want in your component and then that data is given to you.

Gatsby uses GraphQL to enable components to declare the data they need.

When you started the server, a second link was displayed in the terminal: [http://localhost:8000/___graphql](http://localhost:8000/___graphql). This is where you can test you query or explore the types and properties of your GraphQL.

Let's learn how to query your data with GraphQL!

### Query all posts and pages

Basically, to query contents from WordPress, it would be very similar to:

```javascript
{
  allWordpress${Manufacturer}${Endpoint} {
    edges {
      node {
        id
        // Put your fields here
      }
    }
  }
}
```

where `${Manufacturer}` is the endpoint prefix and `${Endpoint}` is the name of the endpoint from the WordPress URL:

`https://wcpboston.eelab.space/wp-json/${Manufacturer}/v2/${Endpoint}`

So, for instance, for all posts, url will be:

`https://wcpboston.eelab.space/wp-json/wp/v2/posts`

and the GraphQL will be:

```javascript
{
  allWordpressPost {
    edges {
      node {
        id
        slug
        title
        content
      }
    }
  }
}
```

It's almost exactly the same for pages, except that the `${Endpoint}` is different:

`https://wcpboston.eelab.space/wp-json/wp/v2/pages`

and the GraphQL will be:

```javascript
{
  allWordpressPage {
    edges {
      node {
        id
        slug
        title
        content
        excerpt
        date
        modified
        status
      }
    }
  }
}
```

As you can see, the differences are the `Query Type` (`allWordpressPost` for posts and `allWordpressPage` for pages) and the fields in the node object.
Doing that, you should have this result on the right:

![GraphiQL All Pages result](/assets/graphiql-all-pages.png)

If you don't know which properties are available in GraphQL, you can press `Shit+Spacebar` on mac or `Ctrl+spacebar` on Windows.

#### Example for a single post query

![GraphiQL Single post](/assets/single-post.png)

All of that is nice, but how are we implement that for the front-end. It's now ReactJS time!

#### :star2: Extra: A few usefull arguments than you can apply to your query

Arguments are used to filter, limit, skip or sort your results from your query. There are applyed to the query type.

<details><summary>Explore how to use arguments in your query</summary>
<p>

#### Sort

The **sort** argument allows you to change the order of your rendered data. It's an object and accepts two properties: the **fields** name (you can sort on multiple fields, the second sort field gets evaluated when the first field is identical) and the **order**. By defaut, it's based on the ***ASC*** order.

##### With one field

```javascript
export const query = graphql`
  query {
    allWordpressPost(
      sort: {
        fields: [title]
        order: DESC
      }
    ) {
      edges {
        node {
          id
          title
          content
        }
      }
    }
  }
`
```

Your data are now order by the field ***title*** and by ***DESC***.
Note that [] around the field name are optionnal when there is only one field.

##### With multiple fields

```javascript
export const query = graphql`
  query {
    allWordpressPost(
      sort: {
        fields: [title, status]
        order: DESC
      }
    ) {
      edges {
        node {
          id
          title
          content
        }
      }
    }
  }
`
```

Your data are now order by the fields ***title*** and ***status*** and by ***DESC***.
Each field has to be separated by a comma.

#### Limit

The **limit** argument allows you to display a certain number of content. It requires an Int as a value:

```javascript
export const query = graphql`
  query {
    allWordpressPost(limit: 6) {
      edges {
        node {
          id
          title
          content
        }
      }
    }
  }
`
```

In this example, we will display only the 6 first last added posts.

#### Skip

The **skip** argument allows you to skip over a number of results. It requires an Int as a value:

```javascript
export const query = graphql`
  query {
    allWordpressPost(skip: 6) {
      edges {
        node {
          id
          title
          content
        }
      }
    }
  }
`
```

In this example, we will omit the 6 first posts.

#### Filter

The **filter** argument allows you to filter your data according a specifif field value with an operator.
Here is the list (part of the documentation):

- **eq**: short for **equal**, must match the given data exactly
- **ne**: short for **not equal**, must be different from the given data
- **regex**: short for **regular expression**, must match the given pattern. Note that backslashes need to be escaped twice, so /\w+/ needs to be written as "/\\\\w+/".
- **glob**: short for **global**, allows to use wildcard * which acts as a placeholder for any non-empty string
- **in**: short for **in array**, must be an element of the array
- **nin**: short for **not in array**, must NOT be an element of the array
- **gt**: short for **greater than**, must be greater than given value
- **gte**: short for **greater than or equal**, must be greater than or equal to given value
- **lt**: short for **less than**, must be less than given value
- **lte**: short for **less than or equal**, must be less than or equal to given value
- **elemMatch**: short for **element match**, this indicates that the field you are filtering will return an array of elements, on which you can apply a filter using the previous operators

For instance, let's filter our posts according to the **category** named "Boston".
First, we have to specify the type, so **category**:
TODO: rajouter le body de la query pour tous les filters

```javascript
allWordpressPost(
  filter: {
    categories: {
      ...
    }
  }
) {
  edges {
    node {
      id
      title
      content
    }
  }
}
```

Then, we add the operator. We will use **elemMatch**:

```javascript
allWordpressPost(
  filter: {
    categories: {
      elemMatch: {
        ...
      }
    }
  }
) {
  edges {
    node {
      id
      title
      content
    }
  }
}
```

And finally, we have to specify which field we want from the categeory and its value with the **eq** operator. Let's go with the **name**.

```javascript
allWordpressPost(
  filter: {
    categories: {
      elemMatch: {
        name: {
          eq: "Boston"
        }
      }
    }
  }
) {
  edges {
    node {
      id
      title
      content
    }
  }
}
```

The query will only render posts that has the category <em>Boston</em>.

</details>
</p>

#### :star2: Extra 2: A Reusable query

Instead of duplicating your query in multiple component, you can use **fragments**.

<details><summary>Explore how to declare and use a fragment:</summary>
<p>

```javascript
fragment FragmentName on TypeName {
  field1
  field2
}
```

It consists of three parts:

1. **FragmentName**: the name of the fragment that will be referenced later, the one of your choice.
2. **TypeName**: the GraphQL type of the object the fragment will be used on. The easiest way to find the GraphQL type is by using the <em>Documentation Explorer</em> from GraphiQL (with the following url: [http://localhost:8000/___graphql](http://localhost:8000/___graphql))

![GraphiQL Documentations Explorer](/assets/graphiql-documentations-explorer.png)

3. **The body of the query**: You can define any fields with any level of nesting in here, like you can do for any other GraphQL query.

Let's see how to create a fragment for all WordPress posts now:

```javascript
fragment allPosts on wordpress__POSTConnection {
  edges {
    node {
      id
      title
      date
    }
  }
}
```

So here, ***allPosts*** is the **FragmentName**, ***wordpress__POSTConnection*** is the **TypeName** that we found for the GraphiQL Documentations Explorer, and the ***edges*** object is the **body of the query**.

Once our fragment is declared, we can use it in our query by calling the **FragmentName** preceded by three dots:

```javascript
{
  allWordpressPost {
    ...allPosts
  }
}
```

Note: When compiling your site, Gatsby preprocesses all GraphQL queries it finds. Therefore, any file that gets included in your project can define a snippet. However, only Pages can define GraphQL queries that actually return data. This is why we can define the fragment in the component file, it doesn’t actually return any data directly.
That's why it's a good pratice to create a file who contains all your fragments and, then you call your fragments in your pages, templates, but not in your components.

So, let's do it!
Create a new file in `components` folder named `fragments.js`, then import `graphql` library, and finally create your fragments based with our previous example. Don't forget to export it.

```javascript
import { graphql } from 'gatsby';

export const fragments = graphql`
  fragment allPosts on wordpress__POSTConnection {
    edges {
      node {
        id
        title
        content
        date(formatString: "dddd DD MMMM YYYY")
      }
    }
  }
`
```

By default, date will be printed as ISO-8601 format. You can format it by adding the **formatString** function and then give the wanted format:

`date(formatString: "dddd DD MMMM YYYY")) // Week day day month year`

Finally, you can use your fragments named `allPosts` in all wanted pages.
Open your `posts.js` file and replace the previous query by calling our fragment:

```javascript
export const query = graphql`
  query {
    allWordpressPost {
      edges {
        node {
          id
          title
          content
        }
      }
    }
  }
`
```

will become:

```javascript
export const query = graphql`
  query {
    allWordpressPost {
      ...allPosts
    }
  }
`
```

Note: If you want to run two queries on the same page, you can use an **alias**. See below based on the previous fragment example:

```javascript
export const query = graphql`
  query {
    firstQuery: allWordpressPost(limit: 6) {
      ...allPosts
    }
    secondQuery: allWordpressPost(skip: 6) {
      ...allPosts
    }
  }
`
```

So now, instead of using the ***query name*** to call your data, you will use the **alias**. In this example, it would be ***data.firstQuery*** or ***data.secondQuery*** instead of ***data.allWordpressPost***

</details>
</p>

## Display all posts to the front-end

<img src="./assets/reactjs-logo.png" width="100" height="100">

Inside the post page that we created earlier `posts.js`, import and the `Layout` component to keep the header and footer, and wrap the h1 html tag with the new component:

```javascript
import React from "react"
import Layout from "../components/layout"

export default (props) => {
  return (
    <Layout>
      <h1>Posts page</h1>
    </Layout>
  )
}
```

If you server is still running, it should have compiled.

If you go back to the website, you should be able to visit this page: [http://localhost:8000/posts](http://localhost:8000/posts)

Let's now display all posts title and his content! To do so, it's very simple. You first need to import `graphql` from gatsby at the top of your file:

`import { graphql } from 'gatsby'`

Then after your function, you just need to export a variable who contains the graphql query:

```javascript
export const query = graphql`
  query {
    allWordpressPost {
      edges {
        node {
          id
          title
          content
        }
      }
    }
  }
`
```

And finally, you can update your function to display the content. Because GraphQL returns us an array, you will have to loop throught it:

```javascript
export default (props) => {
  return (
    <Layout>
      <h1>Posts page</h1>
      {props.data.allWordpressPost.edges.map(post => {
        return (
          <div key={post.node.id}>
            <h2 dangerouslySetInnerHTML={{ __html: post.node.title }} />
            <div dangerouslySetInnerHTML={{ __html: post.node.content }} />
          </div>
        )
      })}
    </Layout>
  )
}
```

#### What did we?

Querying with Graphql will returns us an object ***data*** (it's always <em>data</em>!). Inside this object, we have another object ***allWordpressPost*** (the one we specify from our query, it will be <em>allWordpressPages</em> if we want all pages for instance) and inside this one, we have another one ***edges*** who is basically an array of objects which contains all our data, that's why we are using the <em>map()</em> function to loop throught the array.

If you go back to the website, all posts form WordPress are displayed! But you've probably notice that something is not good, HTML is not striped. it's because by default, React escapes the HTML to prevent XSS (Cross-site scripting). So to render HTML, we have to add the following property to our HTML tag:

`dangerouslySetInnerHTML={{ __html: ... }}`

<em>dangerouslySetInnerHTML</em> is React's replacement for using innerHTML in the browerDOM.

So, your function should looks like that now:

```javascript
{props.data.allWordpressPost.edges.map(post => {
  return (
    <div key={post.node.id}>
      <h2 dangerouslySetInnerHTML={{ __html: post.node.title }} />
      <div dangerouslySetInnerHTML={{ __html: post.node.content }} />
    </div>
  )
})}
```

And now, your content is rendered properly!

:warning: **IMPORTANT**: Only pages or template pages can define GraphQL queries. If you want to use a GraphQL query inside a component, you will have to use a hook of `StaticQuery` called `useStaticQuery`, that allows components to retrieve data via GraphQL query (we will see later how yo use it).

#### :star2: Extra: Create a single post

If you want to create dynamic template, like single post, you will have to do a few more things.

<details><summary>Explore how to create a single post</summary>
<p>

In order to create single post, you will have to create a new folder in `src/` named `templates` and insite this new folder, create a file named `post.js`. And, paste the following code in it:

```javascript
import React from "react"
import Layout from "../components/layout"

export default (props) => {
  return (
    <Layout>
      <h1>Post template</h1>
    </Layout>
  )
}
```

Good! Now, the last think you will have to do is to use a hook from Gatsby APIs: `createPages`, and you have to do that inside the `gatsby-node.js` file. So, open this file, and first, import those two modules at the top of the file:

```javascript
const Promise = require('bluebird')
const path = require('path')
```

Then, you can implemente the `createPages` hook by doing the following:

```javascript
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allWordpressPost {
          edges {
            node {
              id
              slug
            }
          }
        }
      }`
    ).then(result => {
      // Create posts pages.
      result.data.allWordpressPost.edges.forEach(({ node }) => {
        createPage({
          path: `/post/${node.slug}/`,
          component: path.resolve(`./src/templates/post.js`),
          context: {
            id: node.id,
          },
        })
      })
      resolve()
    })
  })
}
```

`createPage` function belongs to `createPages hook` and it will be called by Gatsby whenever a new node is created and create a page for you. See the [documentation](https://www.gatsbyjs.org/docs/actions/#createPage) for more informations.

Inside your Promise, this is where you put your wanted GraphQL query. Because we want to create a single post, we need to retrieve all posts, then loop through all of them. `createPage` function accepts a few parameters, and you will need `path` and `component`.

- **path**: url of your single post. It must start with a forward slash.
- **component**: absolute path to the template that you will use to display your single post.

You can find all the documentation [here](https://www.gatsbyjs.org/tutorial/part-seven/).

Finally, restart your server. Don't forget to stop your server: from your terminal, press `ctr+c`, and then run the following command `gatsby develop` to start it.

But, we are not done yet! There is a last thing to do: add links to your posts.

Open the `posts.js` file in `src/pages/` folder, then at the top of your file, import a new component from Gatsby, `<Link />`. Because you already have imported `graphql` from gatsby, replace the former line with this one:

```javascript
import { graphql, Link } from 'gatsby'
```

The Gatsby `<Link />` component is for linking between pages within your site.

Then, update your graphQL query to add the `slug` field:

```javascript
export const query = graphql`
  query {
    allWordpressPost {
      edges {
        node {
          slug
          id
          title
          content
        }
      }
    }
  }
`
```

Finally, wrap the title with the `<Link />` component by doing the following:

```javascript
<Link to={`post/${post.node.slug}`}>
  <h2 dangerouslySetInnerHTML={{ __html: post.node.title }} />
</Link>
```

So your function should looks like that:

```javascript
export default (props) => {
  return (
    <Layout>
      <h1>Posts page</h1>
      {props.data.allWordpressPost.edges.map(post => {
        return (
          <div key={post.node.id}>
            <Link to={`post/${post.node.slug}`}>
              <h2 dangerouslySetInnerHTML={{ __html: post.node.title }} />
            </Link>
            <div dangerouslySetInnerHTML={{ __html: post.node.content }} />
          </div>
        )
      })}
    </Layout>
  )
}
```

Navigate now to your posts page `http://localhost:8000/posts`, and click on a post title. You should be able to see the title `Post template`.

Ok! That's cool! But what if we want to display data from a single post ? Let's explore how to do that!

Open your `post.js` file in `src/templates` folder, and import `graqhql` from gatsby at the top of the file:

```javascript
import { graphql } from 'gatsby'
```

Then, at the bottom of the page, export the following graphQL query:

```javascript
export const query = graphql`
  query {
    wordpressPost {
      title
      content
      featured_media {
        id
        source_url
        alt_text
      }
    }
  }
`
```

Because we want to display data from one post, we are using the `Query Type wordpressPost`. Now, title, content and the featured image are available for the front-end. Let's display them!

Replace the export function with the following code:

```javascript
export default (props) => {
  const singlePost = props.data.wordpressPost;

  return (
    <Layout>
      <h1>{singlePost.title}</h1>
      <img  src={singlePost.featured_media.source_url}
            alt={singlePost.featured_media.alt_text}
      />
      <div dangerouslySetInnerHTML={{ __html: singlePost.content }} />
    </Layout>
  )
}
```

If you now visite a single post page, you will be able to see the title, a featured image and the content. Amazing!

</details>
</p>

#### :star2: Extra 2: Import Gutenberg CSS block library to Gatsby

In order to apply Gutenberg block styles to your website, there is a few steps to follow.

<details><summary>See all steps</summary>
<p>

1. First, stop the development server if it's still running:<br/>
`control+c` or `ctrl + c` for windows.
2. Then retrieve the CSS file in `/wp-includes/css/dist/block-library` named `style.min.css`.
3. Then Create a folder named **styles** in `src/` and put the `style.min.css` file from WordPress
4. Then, in `gatsby-browser.js` file, import this file with this line:<br/>
`import "./src/styles/block-library.min.css";`
5. Finally, restart the development server:<br/>
`gatsby develop`

</details>
</p>

## Bonus: Pull ACF and Menus

### ACF

You will have to first, set the `useACF` property to `true` from `gatsby-source-wordpress` settings in `gatsby-config.js` file, and secondly, have the plugin [acf-to-rest-api](https://github.com/airesvsg/acf-to-rest-api) installed in WordPress.

Then, restart your server (`control+c` or `ctrl+c` for windows, to stop it, then `gatsby develop` to start it).

Let's use the following example:

![All posts](/assets/all-posts.png)

Each post has a link (htts://www.google.ca), this link is an Advanced Custom Field from WordPress.

In order to retrieve this field, from the all posts query, you just need to add a new field:

```javascript
export const query = graphql`
  query {
    allWordpressPost {
      edges {
        node {
          id
          title
          content
          acf {
            field_url
          }
        }
      }
    }
  }
`
```

And now, update your render function to display this field:

```javascript
<a target="_blank" rel="noopener noreferrer" href={post.node.acf.field_url}>
  {post.node.acf.field_url}
</a>
```

So, your function should looks like the following:

```javascript
export default (props) => {
  return (
    <Layout>
      <h1>Posts page</h1>
      {props.data.allWordpressPost.edges.map(post => {
        return (
          <div key={post.node.id}>
            <h2 dangerouslySetInnerHTML={{ __html: post.node.title }} />
            <div dangerouslySetInnerHTML={{ __html: post.node.content }} />
            <a target="_blank" rel="noopener noreferrer" href="{post.node.acf.field_url}">
              {post.node.acf.field_url}
            </a>
          </div>
        )
      })}
    </Layout>
  )
}
```

### Menus

You will have to add the plugin [wp-api-menus] to WordPress (https://wordpress.org/plugins/wp-api-menus/) which gives you the menus and menu locations endpoint to the REST-API (we already added this plugin to our WordPress in order to be available for you).

Then add your pages, links, etc into WordPress Menus, restart your server (don't forget to do it, otherwise, you won't be able to pull your data with GraphQL)

To query menus from the REST-API, the `${Manufacturer}` is `WpApiMenus` and the `${Endpoint}` is `MenusItems`. This is the query:

```javascrit
allWordpressWpApiMenusMenusItems {
  edges {
    node {
      items {
        title
        object_slug
      }
    }
  }
}
```

Gatsby already has a `Layout` component in `src/components/`, so it's a good place to add your menu query. Open the `layout.js` file, and inside `useStaticQuery`, past our menu query:

```javascript
const data = useStaticQuery(graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
    allWordpressWpApiMenusMenusItems {
      edges {
        node {
          items {
            title
            object_slug
          }
        }
      }
    }
  }
`)
```

NOTE: By default, file inside src/components folder cannot accept graphQL query, but Gatsby v2.1.0 introduces a hooks version of StaticQuery called useStaticQuery, a new API that allows components to retrieve data via GraphQL query. See the full [documentation here](https://www.gatsbyjs.org/docs/use-static-query/).

We can finally render the menus with React:

```javascript
<nav>
  <ul>
    {nav.edges[0].node.items.map((node, index) => {
      return (
        <li key={index}>
          <Link to={"/" + node.object_slug}>{node.title}</Link>
        </li>
      )
    })}
  </ul>
</nav>
```

## Build a prodution version

To build a produciton version, Gatsby provide us a command who produce a directory of static HTML and JavaScript files (public folder) which you can deploy to a static site hosting service.

Simply do the following command `gatsby build` at the root of the project folder.

A few secondes later, Gatsby should have create a `public` folder. We will deploy this folder in the next step.

## Deploy to production with Surge

<img src="./assets/surge-logo.jpeg" width="100" height="100">

Surge is one of many "static site hosts" which make it possible to deploy Gatsby sites.

In order to be able to use it, follow the next steps:

1. Install Surge with the following command: `npm install --global surge`
2. Then, deploy your site: `surge public/`. If it's the firsts time, you will have to create an account (don't worry, it's free!). Enter your email, password, and press enter to confirm that the path to your public/ folder is correct.
3. Bonus: To ensure future deploys are sent to the same location, you can remember a domain. For instance, if your website was deployed to http://amazing-website.surge.sh/, run the following command: `surge --domain amazing-website.surge.sh`. The next time yo will run the `surge` command, it will deploy to the same domain.

![Amazing](https://media2.giphy.com/media/XreQmk7ETCak0/giphy.gif?cid=790b76115d2fca115763426e2e8cb7f6&rid=giphy.gif)

## Credits

Logos: WordPress, Gutenberg, Gatsbyjs, Graphql, Reactjs, Surge.sh
