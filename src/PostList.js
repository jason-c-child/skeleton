import React from 'react'
// "pure", and ultra sparse component
// expects an array of json posts
// maps over it...that is all!
// each element in the posts array
// is used as the props for a Post component
// via the object rest syntax
//
// this uses an inline style in the top level div
export default props =>
  <div style={{ width: '900px', flexDirection: 'row', flexWrap: 'wrap', display: 'flex'}}>
    { props.posts.map(x => <Post {...x} key={`${x.userId}.${x.id}`} />) }
  </div>

// Post component 'style object'
const postStyle = {
  textAlign: 'left',
  margin: '10px',
  padding: '5px',
  backgroundColor: '#999999',
  width: '300px'
}

// Post component
export const Post = props => {
  // destructure props to use in the JSX
  // template...
  const {userId, id, title, body} = props

  // using inline style with an object...
  return (
    <div style={postStyle}>
      <div>
        <div style={{fontWeight: 'bold'}}> User ID: {userId} ID: {id} </div>
      </div>
      <div>
        <span> {`Title: ${title}`} </span>
      </div>
      <div>
        {body}
      </div>
    </div>
  )
}
