# Make your WordPress Rest API queries easy with GraphQL and Gatsby

With the web ecosystem steadily moving towards Javascript and React, let's talk about GraphQL as an easier way to make WP Rest API queries. During this session, we will discuss how to pull, sort, organize and optimize your content from WordPress to React using GraphQL, the data query language developed by Facebook.

- [Make your WordPress Rest API queries easy with GraphQL and Gatsby](#make-your-wordpress-rest-api-queries-easy-with-graphql-and-gatsby)
  - [Requirements](#requirements)
  - [WordPress](#wordpress)
  - [Install the Gatsby](#install-the-gatsby)
    - [Let's explore quickly what is installed](#lets-explore-quickly-what-is-installed)
      - [Folders](#folders)
      - [Files](#files)
  - [Link WordPress to Gatsby](#link-wordpress-to-gatsby)
    - [Extra usefull plugins](#extra-usefull-plugins)
    - [Query your data with GraphQL](#query-your-data-with-graphql)
      - [Query all posts and pages](#query-all-posts-and-pages)
  - [Display all posts to the front-end](#display-all-posts-to-the-front-end)
      - [Let's explain what we did](#lets-explain-what-we-did)
    - [A few usefull arguments than you can apply to your query](#a-few-usefull-arguments-than-you-can-apply-to-your-query)
      - [Sort](#sort)
        - [With one field](#with-one-field)
        - [With one field](#with-one-field-1)
      - [Limit](#limit)
      - [Skip](#skip)
      - [Filter](#filter)
  - [Reusable query](#reusable-query)


## Requirements

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

- TIPS: [Install NVM](https://github.com/nvm-sh/nvm)

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


## WordPress

You will not need to install a WordPress. We will provide you an url to use. Or, if you already have your WordPress, you can then use it.

Something very cool with Gatsby is that you can very easily change the WordPress to the one you want just by changing one line in your code.


## Install the Gatsby

Gatsby is a **React-based, GraphQL powered, static site generator**. What does that even mean?  Well, it weaves together the best parts of React, webpack, react-router, GraphQL, and other front-end tools in to one very enjoyable developer experience. Don’t get hung up on the moniker "static site generator".  That term has been around for a while, but Gatsby is far more like a modern front-end framework than a static site generator of old.

It uses powerful preconfiguration to build a website that uses only static files for incredibly fast page loads, service workers, code splitting, server-side rendering, intelligent image loading, asset optimization, and data prefetching.

You code and develop your site, Gatsby transforms it into a directory with a single HTML file and your static assets. This folder is uploaded to your favorite hosting provider, and voila.

In order to generate a Gatsby website, we will use Gatsby CLI.
First, do:

```sh
npm install -g gatsby-cli
```

Then, to generate the website, choose your location then do:

```sh
gatsby new workshop-wordpress-gatsby-react
```

Then, move to this directory

```sh
cd workshop-wordpress-gatsby-react
```

And finally, to start the development server, do:

```sh
gatsby develop
```

And now, your website will be available to [http://localhost:8000/](http://localhost:8000/)


### Let's explore quickly what is installed

![Gatsby folders](/assets/gatsby-folders.png)

#### Folders

- **.cache/**: This folder is an internal cache created automatically by Gatsby. The files inside this folder are not meant for modification. Should be added to the .gitignore file if not added already.
- **node_modules/**: All modules installed by the package.json file. This folder is ignored by git.
- **public/**: This folder is the build directory. It is also ignored by git.
- **src/**: Here is where the magic happens. You will find everything you need to build the website inside  this folder. =>

![Gatsby src folders](/assets/gatsby-src-folders.png)

- **components/**: they are the building blocks of any React app. It’s a JavaScript class or function that optionally accepts inputs i.e. properties(props) and returns a React element that describes how a section of the UI (User Interface) should appear.
- **pages/**: Files in this folder become pages automatically with paths based on their file name. Here is the full [documentation](https://www.gatsbyjs.org/docs/recipes/#creating-pages).
- **templates/**: You don't have this folder at the beginning but it will contains templates for programmatically creating pages. Here is the full [documentation](https://www.gatsbyjs.org/docs/custom-html/)

#### Files

- **gatsby-browser.js**: This is where you put your custom JavaScript. You will have to use Gatsby browser API to make it works. Here is the [documentation](https://www.gatsbyjs.org/docs/browser-apis/).
- **gatsby-config.js**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. Here is the full [documentation](https://www.gatsbyjs.org/docs/gatsby-config/).
- **gatsby-node.js**: This is where you will customize your path, create your page, your single page (files in template folder) … Here is the full [documentation](https://www.gatsbyjs.org/docs/node-apis/).
- **gatsby-ssr.js**: This file is where Gatsby expects to find any usage of the Gatsby server-side rendering APIs. We are not using it but here is the full [documentation](https://www.gatsbyjs.org/docs/ssr-apis/).
- **package.json**: This is where you will add all your modules and scripts that you need for you website.


## Link WordPress to Gatsby

For that, we will have to install a new Gatsby plugin, **[gatsby-source-wordpress](https://www.gatsbyjs.org/packages/gatsby-source-wordpress/)**. It's very simple, open a new terminal window and just do the installation by this simple command line:
(The **--save** tag means that a new line with the plugin slug and his version will be added to the package.json file)

```sh
npm install --save gatsby-source-wordpress
```

Once you've installed the plugin, open **gatsby-config.js** and paste the following code in the plugins array (it's part for the documentation but with only what we need):

    {
      resolve: "gatsby-source-wordpress",
      options: {
        /*
        * The base URL of the Wordpress site without the trailingslash and the protocol. This is required.
        * Example : 'gatsbyjsexamplewordpress.wordpress.com' or 'www.example-site.com'
        */
        baseUrl: "wcpboston.eelab.space",
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

We are now able to pull data into Gatsby from WordPress using the WordPress REST API.
NOTE: Every time you modify this file, you will have to restart the server. Press **ctrl+c** to stop the server if it's still running, then:

```sh
gatsby develop
```

### Extra usefull plugins

By default, WordPress don't add data from ACF, Menus, WPLM... in his REST-API so you will have to install a few plugins to your WordPress in order to be able to have those data available with GraphQL.

- **ACF**

  You will have to first, set the ***useACF*** property to ***true*** from **gatsby-source-wordpress** settings in **gatsby-config.js** file, and secondly, have the plugin [acf-to-rest-api](https://github.com/airesvsg/acf-to-rest-api) installed in WordPress.

- **Menus**

  You will have to add the plugin [wp-api-menus](https://wordpress.org/plugins/wp-api-menus/) which gives you the menus and menu locations endpoint.

- **WPML**

  You will have to add the plugin [wpml-rest-api](https://github.com/shawnhooper/wpml-rest-api) which adds the current locale and available translations to all post types translated with WPML.

- **YOAST**

  You will have to add the plugin [wp-api-yoast-meta](https://github.com/maru3l/wp-api-yoast-meta) which allows you to pull the <em>yoast_meta: {...}</em>


### Query your data with GraphQL

GraphQL is a query language (the QL part of its name). If you’re familiar with SQL, it works in a very similar way. Using a special syntax, you describe the data you want in your component and then that data is given to you.

Gatsby uses GraphQL to enable components to declare the data they need.

When you started the server, a second link was displayed in the terminal: [http://localhost:8000/___graphql](http://localhost:8000/___graphql). This is where you can test you query or explore the types and properties of your GraphQL.

#### Query all posts and pages

Basically, to query contents from WordPress, it would be very similar to:

```
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

where ***${Manufacturer}*** is the endpoint prefix and ***${Endpoint}*** is the name of the endpoint from the WordPress URL:

`https://wcpboston.eelab.space/wp-json/${Manufacturer}/v2/${Endpoint}`

So, for instance, for all posts, url will be:

`https://wcpboston.eelab.space/wp-json/wp/v2/posts`

and the GraphQL will be:

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

It's almost exactly the same for pages, except that the ***${Endpoint}*** is different:

`https://wcpboston.eelab.space/wp-json/wp/v2/pages`

and the GraphQL will be:

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

As you can see, the differences are the **Query Type** (***allWordpressPost*** for posts and ***allWordpressPage*** for pages) and the fields in the node object.
Doing that, you should have this result on the right:

TODO: Display a result with the proper WORDPRESS

If you don't know which properties are available in GraphQL, you can press **Shit+Spacebar** on mac or **Ctrl+spacebar** on Windows.

All of that is nice, but how are we implement that for the front-end. It's now ReactJS time!

## Display all posts to the front-end

Let's first create a new page called **posts.js**, then **import React** and the **Layout** component to keep the header and footer, and finally create a function that just return the title of the page:

    import React from "react"
    import Layout from "../components/layout"

    export default (props) => {
      return (
        <Layout>
          <h1>Posts page</h1>
        </Layout>
      )
    }

If you server is still running, it should have compiled and you should be able to see this line:

```sh
6 pages                                                                                 gatsby-starter-default
```

If you go back to the website, you should be able to visit this page: [http://localhost:8000/posts](http://localhost:8000/posts)

Let's now display all posts title and his content! To do so, it's very simple. You first need to import **graphql** from gatsby at the top of your file:

`import { graphql } from 'gatsby'`

Then after your function, you just need to export a variable who contains the graphql query:

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

And finally, you can update your function to display the content. Because GraphQL returns us an array, we will have to loop throught it:

    export default (props) => {
      return (
        <Layout>
          <h1>Posts page</h1>
          {props.data.allWordpressPost.edges.map(({node}) => {
            return (
              <div key={node.id}>
                <h2 dangerouslySetInnerHTML={{ __html: node.title }} />
                <p dangerouslySetInnerHTML={{ __html: node.content }} />
              </div>
            )`
          })}
        </Layout>
      )
    }

#### Let's explain what we did

Querying with Graphql will returns us an object ***data*** (it's always <em>data</em>!). Inside this object, we have another object ***allWordpressPost*** (the one we specify from our query, it will be <em>allWordpressPages</em> if we want all pages for instance) and inside this one, we have another one ***edges*** who is basically an array of objects which contains all our data, that's why we are using the <em>map()</em> function to loop throught the array.

If you go back to the website, all posts form WordPress are displayed! But you've probably notice that something is not good, HTML is not striped. it's because by default, React escapes the HTML to prevent XSS (Cross-site scripting). So to render HTML, we have to add the following property to our HTML tag:

`dangerouslySetInnerHTML={{ __html: ... }}`

<em>dangerouslySetInnerHTML</em> is React's replacement for using innerHTML in the browerDOM.

So, your function should looks like that now:

```
{props.data.allWordpressPost.edges.map(({node}) => {
  return (
    <div key={node.id}>
      <h2 dangerouslySetInnerHTML={{ __html: node.title }} />
      <p dangerouslySetInnerHTML={{ __html: node.content }} />
    </div>
  )
})}
```

And now, your content is rendered properly!

### A few usefull arguments than you can apply to your query

Arguments are used to filter, limit, skip or sort your results from your query. There are applyed to the query type.

#### Sort

The **sort** argument allows you to change the order of your rendered data. It's an object and accepts two properties: the **fields** name (you can sort on multiple fields, the second sort field gets evaluated when the first field is identical) and the **order**. By defaut, it's based on the ***ASC*** order.

<!-- ##### Without fields

    export const query = graphql`
      query {
        allWordpressPost(sort: { order: DESC }) {
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

Your data are now order by ***DESC*** insteand of ***ASC***. -->

##### With one field

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

Your data are now order by the field ***title*** and by ***DESC***.
Note that [] around the field name are optionnal when there is only one field.

##### With multiple fields

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

Your data are now order by the fields ***title*** and ***status*** and by ***DESC***.
Each field has to be separated by a comma.

#### Limit

The **limit** argument allows you to display a certain number of content. It requires an Int as a value:

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

In this example, we will display only the 6 first last added posts.

#### Skip

The **skip** argument allows you to skip over a number of results. It requires an Int as a value:

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

```
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

```
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

```
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


## Reusable query

Instead of duplicating your query in multiple component, you can use **fragments**.
Here is how you declare a frament:

```
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
TODO: rajouter la const devant le fragment

```
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

```
{
  allWordpressPost {
    ...allPosts
  }
}
```

Note: When compiling your site, Gatsby preprocesses all GraphQL queries it finds. Therefore, any file that gets included in your project can define a snippet. However, only Pages can define GraphQL queries that actually return data. This is why we can define the fragment in the component file, it doesn’t actually return any data directly.
That's why it's a good pratice to create a file who contains all your fragments and, then you call your fragments in your pages, templates, but not in your components.

So, let's do it!
Create a new file in components folder named **fragments.js**, then import **graphql** library, and finally create your fragments based with our previous example. Don't forget to export it.

```
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

Finally, you can use your fragments named **allPosts** in all wanted pages.
Open your **posts.js** file and replace the previous query by calling our fragment:

```
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

```
export const query = graphql`
  query {
    allWordpressPost {
      ...allPosts
    }
  }
`
```

Note: If you want to run two queries on the same page, you can use an **alias**. See below based on the previous fragment example:

```
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

## Import block library CSS to Gatsby

In order to apply Gutenberg block styles to your website, there is a few steps to follow:

1. First, stop the development server if it's still running:<br/>
`ctrl + c`.
2. Then retrieve the CSS file in **/wp-includes/css/dist/block-library** named **style.min.css**.
3. Then Create a folder named **styles** in ***src/*** and put the ***style.min.css*** file from WordPress
4. Then, in ***gatsby-browser.js*** file, import this file with this line:<br/>
`import "./src/styles/block-library.min.css";`
5. Finally, restart the development server:<br/>
`gatsby develop`

