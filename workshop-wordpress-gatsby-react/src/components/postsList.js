import React from 'react';
import Layout from "./layout"

const flex = {
  display: 'flex',
  alignItems: 'flex-end',
  marginBottom: '25px'
};

export default (props) => {
  return (
    <Layout>
      <h1>{props.title}</h1>
      {props.data.edges.map(({ node }) => {
        return (
          <div key={node.id}>

            <div style={flex}>
              <h2 dangerouslySetInnerHTML={{ __html: node.title }} style={{ marginBottom: '0' }} />
              {node.categories.map((cat, index) => {
                return (
                  <span key={index} dangerouslySetInnerHTML={{ __html: cat.name }} style={{ marginLeft: '10px', fontSize: '16px' }} />
                )
              })}
            </div>

            <p dangerouslySetInnerHTML={{ __html: node.content }} />
          </div>
        )
      })}
    </Layout>
  );
};