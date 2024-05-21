Here is the documentation file that explains how to use the `Medial` class and its methods:

## Medial Class Documentation

### Constructor

#### `Medial(accessToken)`

- **Parameters**:
  - `accessToken` (String): Your access token for authenticating API requests.

### Methods

#### `_sendFormData(formData)`

Private method to send form data.

- **Parameters**:
  - `formData` (FormData): The form data to be sent.

- **Returns**:
  - `Promise<Object>`: The API response data.

#### `getPods(offset = 0, limit = 20)`

Fetches a list of pods from the Medial API.

- **Parameters**:
  - `offset` (Number, optional): The offset for pagination (default is 0).
  - `limit` (Number, optional): The limit for the number of pods to fetch (default is 20).

- **Returns**:
  - `Promise<Array>`: An array of pod objects.

#### `getPosts(offset = 0, limit = 20, filter = 'trending')`

Fetches a list of posts from the Medial API.

- **Parameters**:
  - `offset` (Number, optional): The offset for pagination (default is 0).
  - `limit` (Number, optional): The limit for the number of posts to fetch (default is 20).
  - `filter` (String, optional): The filter to apply to the posts (default is 'trending'). Options are 'trending' or 'latest'.

- **Returns**:
  - `Promise<Object>`: The API response data.

#### `sendPost({ content, referenceType, referenceId, rootPostId, creatorId, creatorType, images })`

Sends a new post.

- **Parameters**:
  - `content` (String): The content of the post.
  - `referenceId` (String, optional): The reference ID of the post.
  - `rootPostId` (String, optional): The root post ID.
  - `creatorId` (String): The ID of the creator.
  - `creatorType` (String): The type of the creator ('USER' or 'ANON').
  - `images` (Array<File>, optional): An array of image files to attach to the post.

- **Returns**:
  - `Promise<Object>`: The API response data.

#### `sendComment({ content, referenceId, rootPostId, creatorId, creatorType })`

Sends a new comment.

- **Parameters**:
  - `content` (String): The content of the comment.
  - `referenceId` (String): The reference ID of the post being commented on.
  - `rootPostId` (String): The root post ID.
  - `creatorId` (String): The ID of the creator.
  - `creatorType` (String): The type of the creator ('USER' or 'ANON').

- **Returns**:
  - `Promise<Object>`: The API response data.

#### `sendPoll({ content, referenceType, referenceId, rootPostId, creatorId, creatorType, question, options })`

Sends a new poll post.

- **Parameters**:
  - `content` (String): The content of the poll post.
  - `referenceType` (String, optional): The reference type of the post.
  - `referenceId` (String, optional): The reference ID of the post.
  - `rootPostId` (String, optional): The root post ID.
  - `creatorId` (String): The ID of the creator.
  - `creatorType` (String): The type of the creator ('USER' or 'ANON').
  - `question` (String): The poll question.
  - `options` (Array<Object>): An array of options for the poll. Each option should be an object with a `text` property.

- **Returns**:
  - `Promise<Object>`: The API response data.

#### `sendLink({ content, referenceType, referenceId, rootPostId, creatorId, creatorType, links })`

Sends a new link post.

- **Parameters**:
  - `content` (String): The content of the link post.
  - `referenceType` (String, optional): The reference type of the post.
  - `referenceId` (String, optional): The reference ID of the post.
  - `rootPostId` (String, optional): The root post ID.
  - `creatorId` (String): The ID of the creator.
  - `creatorType` (String): The type of the creator ('USER' or 'ANON').
  - `links` (Array<String>): An array of links to include in the post.

- **Returns**:
  - `Promise<Object>`: The API response data.

#### `likePost({ referenceId, referenceType })`

Likes a post.

- **Parameters**:
  - `referenceId` (String): The reference ID of the post to like.
  - `referenceType` (String): The reference type of the post ('POST').

- **Returns**:
  - `Promise<Object>`: The API response data.

#### `getUser(userId)`

Fetches a user by ID.

- **Parameters**:
  - `userId` (String): The ID of the user to fetch.

- **Returns**:
  - `Promise<Object>`: The API response data.

#### `sendConversation({ receiverId, text })`

Sends a message to start a conversation.

- **Parameters**:
  - `receiverId` (String): The ID of the receiver.
  - `text` (String): The text of the message.

- **Returns**:
  - `Promise<Object>`: The API response data.

## Usage Examples

### Initializing the Class

```javascript
const medial = new Medial('your-access-token');
```

### Fetching Pods

```javascript
medial.getPods().then(pods => {
  console.log(pods);
}).catch(error => {
  console.error(error);
});
```

### Fetching Posts

```javascript
medial.getPosts(0, 20, 'trending').then(posts => {
  console.log(posts);
}).catch(error => {
  console.error(error);
});
```

### Sending a Post

```javascript
const images = ["https://image.com/1"];
medial.sendPost({
  content: 'This is a post with images',
  referenceType: 'POD',
  referenceId: 'some-reference-id',
  rootPostId: '',
  creatorId: 'creator-id',
  creatorType: 'USER',
  images: images
}).then(response => {
  console.log(response);
}).catch(error => {
  console.error(error);
});
```

### Sending a Comment

```javascript
medial.sendComment({
  content: 'This is a comment',
  referenceId: 'post-reference-id',
  rootPostId: 'root-post-id',
  creatorId: 'creator-id',
  creatorType: 'USER'
}).then(response => {
  console.log(response);
}).catch(error => {
  console.error(error);
});
```

### Sending a Poll

```javascript
medial.sendPoll({
  content: 'React vs No Framework',
  referenceType: 'POD',
  referenceId: 'some-reference-id',
  rootPostId: '',
  creatorId: 'creator-id',
  creatorType: 'USER',
  question: 'React vs No Framework?',
  options: ["React","No framework"]
}).then(response => {
  console.log(response);
}).catch(error => {
  console.error(error);
});
```

### Sending a Link Post

```javascript
medial.sendLink({
  content: 'Check out this link',
  referenceType: 'POD',
  referenceId: 'some-reference-id',
  rootPostId: '',
  creatorId: 'creator-id',
  creatorType: 'USER',
  links: ['https://google.com']
}).then(response => {
  console.log(response);
}).catch(error => {
  console.error(error);
});
```

### Liking a Post

```javascript
medial.likePost({
  referenceId: 'post-reference-id',
  referenceType: 'POST'
}).then(response => {
  console.log(response);
}).catch(error => {
  console.error(error);
});
```

### Fetching a User

```javascript
medial.getUser('user-id').then(user => {
  console.log(user);
}).catch(error => {
  console.error(error);
});
```

### Sending a Conversation

```javascript
medial.sendConversation({
  receiverId: 'receiver-id',
  text: 'Hi, do you really work for big tech or just for fun bro?'
}).then(response => {
  console.log(response);
}).catch(error => {
  console.error(error);
});
```

This documentation provides an overview of the `Medial` class and its methods, including how to use each method with sample usage examples. Make sure to replace `'your-access-token'` and other placeholder values with actual data.
