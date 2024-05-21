/**
 * Medial is a class that provides an interface to interact with the Medial API.
 * It handles authentication, sending form data, fetching images, and various API operations.
 */
class Medial {
    /**
    * Constructs a new Medial instance with the provided access token.
    * @param {string} accessToken - The access token to use for authentication.
    */
    constructor(accessToken) {
        this.baseUrl = 'https://prod.medial.app/api';
        this.accessToken = accessToken; // Replace with your access token
    }
    /**
 * Decodes a JSON Web Token (JWT) and returns the payload as a JavaScript object.
 *
 * @param {string} token - The JWT to decode.
 * @returns {object} - The decoded payload of the JWT.
 */
    _decodeJWT(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }


    /**
 * Sends form data to the specified URL with the provided access token.
 *
 * @param {FormData} formData - The form data to be sent.
 * @returns {Promise<any>} - The response data from the server.
 * @throws {Error} - If there is an error sending the form data.
 */
    async _sendFormData(formData) {
        const url = `${this.baseUrl}/v2/post`;
        const headers = {
            'Accept': 'application/json',
            'Access-Token': this.accessToken,
            'Connection': 'Keep-Alive',
            'Host': 'prod.medial.app',
            'User-Agent': 'com.medial.android',
            'VersionCode': '32',
            'VersionName': '1.3.1'
        };

        const requestOptions = {
            method: 'POST',
            headers,
            body: formData
        };

        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    /**
 * Fetches an image from the provided URL and returns a File object representing the image.
 *
 * @param {string} url - The URL of the image to fetch.
 * @returns {Promise<File>} - A Promise that resolves to a File object representing the fetched image.
 * @throws {Error} - If there is an error fetching the image.
 */
    async _fetchImage(url) {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const fileName = url.split('/').pop();
            const file = new File([blob], fileName, { type: blob.type });
            return file;
        } catch (error) {
            console.error('Error fetching image:', error);
            throw error;
        }
    }

    /**
 * Fetches and returns an array of images from the provided image sources.
 *
 * @param {(string|File)[]} imageSources - An array of image sources, which can be either strings (URLs) or File objects.
 * @returns {Promise<(HTMLImageElement|File)[]>} - A Promise that resolves to an array of images, either as HTMLImageElement or File objects.
 */
    async _getImages(imageSources) {
        const images = [];

        for (const source of imageSources) {
            if (typeof source === 'string') {
                // Assume it's a URL
                const image = await this._fetchImage(source);
                images.push(image);
            } else if (source instanceof File) {
                // Assume it's a File object
                images.push(source);
            }
        }

        return images;
    }
    /**
 * Returns the user ID from the access token.
 * @returns {string} The user ID.
 */
    getMyId() {
        const jwt = this._decodeJWT(this.accessToken);
        return jwt.userId;
    }
    /**
    * Fetch a list of pods from the Medial API.
    * @param {number} [offset=0] - The offset for pagination (default is 0).
    * @param {number} [limit=20] - The limit for the number of pods to fetch (default is 20).
    * @returns {Promise<Array>} A Promise that resolves with an array of pod objects.
    * @throws {Error} Throws an error if the API request fails.
    */
    async getPods(offset = 0, limit = 20) {
        const url = `${this.baseUrl}/v1/pod?offset=${offset}&limit=${limit}`;
        const headers = {
            'Accept': 'application/json',
            'Accept-Charset': 'UTF-8',
            'Accept-Encoding': 'gzip',
            'Access-Token': this.accessToken,
            'Connection': 'Keep-Alive',
            'Host': 'prod.medial.app',
            "origin":"chrome-extension://bhmdjpobkcdcompmlhiigoidknlgghfo",
            'User-Agent': 'com.medial.android',
            'VersionCode': '32',
            'VersionName': '1.3.1'
        };

        const requestOptions = {
            method: 'GET',
            headers
        };

        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error(`Failed to fetch pods: ${response.statusText}`);
            }
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error fetching pods:', error);
            throw error;
        }
    }

    /**
     * Fetch a list of posts from the Medial API.
     * @param {number} [offset=0] - The offset for pagination (default is 0).
     * @param {number} [limit=20] - The limit for the number of posts to fetch (default is 20).
     * @param {string} [filter='trending'] - The filter to apply to the posts (default is 'trending') trending || latest.
     * @returns {Promise<Object>} A Promise that resolves with the API response data.
     * @throws {Error} Throws an error if the API request fails.
     */
    async getPosts(offset = 0, limit = 20, filter = 'trending') {
        const url = `${this.baseUrl}/v2/post?offset=${offset}&limit=${limit}&filter=${filter}`;
        const headers = {
            'Accept': 'application/json',
            'Accept-Charset': 'UTF-8',
            'Accept-Encoding': 'gzip',
            'Access-Token': this.accessToken,
            'Connection': 'Keep-Alive',
            'Host': 'prod.medial.app',
            'User-Agent': 'com.medial.android',
            'VersionCode': '32',
            'VersionName': '1.3.1'
        };

        const requestOptions = {
            method: 'GET',
            headers
        };

        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error(`Failed to fetch posts: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    }
    /**
 * Sends a post to the server with the provided content and metadata.
 *
 * @param {Object} options - The options for the post.
 * @param {string} options.content - The content of the post.
 * @param {string} [options.referenceType="POD"] - The reference type for the post.
 * @param {string} options.referenceId - The reference ID for the post.
 * @param {string} options.creatorId - The ID of the creator of the post.
 * @param {string} [options.rootPostId=""] - The ID of the root post, if this is a reply.
 * @param {string} [options.creatorType="USER"] - The type of the creator of the post.
 * @param {[]} [options.images] - The images to be uploaded with the post can be list of string or files.
 * @returns {Promise<Response>} - The response from the server.
 */
    async sendPost({ content, referenceType = "POD", referenceId, creatorId, rootPostId = "", creatorType = "USER", images }) {
        const formData = new FormData();
        const postPayload = {
            content,
            referenceType,
            referenceId,
            rootPostId,
            creator: {
                id: creatorId || this.getMyId(),
                type: creatorType
            },
            media: images && images.length > 0 ? { type: "IMAGE" } : null
        };

        if (images && images.length > 0) {
            sourceImage= await this._getImages(images)
            sourceImage.forEach((image, index) => {
                formData.append(`postImages[${index}]`, image, image.name);
            });
        }

        formData.append('post', JSON.stringify(postPayload));
        return this._sendFormData(formData);
    }

    /**
 * Sends a comment to the server.
 *
 * @param {object} params - The parameters for the comment.
 * @param {string} params.content - The content of the comment.
 * @param {string} params.referenceId - The ID of the post the comment is referencing.
 * @param {string} params.rootPostId - The ID of the root post the comment is referencing.
 * @param {string} [params.creatorId] - The ID of the user creating the comment. If not provided, the user's ID will be used.
 * @param {string} params.creatorType - The type of the user creating the comment.
 * @returns {Promise<any>} - The response from the server.
 */
    async sendComment({ content, referenceId, rootPostId, creatorId, creatorType }) {
        const formData = new FormData();
        const postPayload = {
            content,
            referenceType: 'POST',
            referenceId,
            rootPostId,
            creator: {
                id: creatorId || this.getMyId(),
                type: creatorType
            }
        };

        formData.append('post', JSON.stringify(postPayload));
        return this._sendFormData(formData);
    }

    /**
 * Sends a poll post to the server.
 *
 * @param {Object} options - The options for the poll post.
 * @param {string} options.content - The content of the post.
 * @param {string} [options.referenceType="POD"] - The reference type of the post.
 * @param {string} options.referenceId - The reference ID of the post.
 * @param {string} [options.rootPostId=""] - The root post ID of the post.
 * @param {string} options.creatorId - The ID of the creator of the post.
 * @param {string} options.creatorType - The type of the creator of the post.
 * @param {string} options.question - The question for the poll.
 * @param {Array<string>} options.options - The options for the poll.
 * @returns {Promise<any>} - The response from the server.
 */


    async sendPoll({ content, referenceType = "POD", referenceId, rootPostId = "", creatorId, creatorType, question, options }) {
        const formData = new FormData();
        const formattedOptions = options.map(option => ({
            text: option.toString(), // Convert option to string
            selectionCount: 0
        }));
        const postPayload = {
            content,
            referenceType,
            referenceId,
            rootPostId,
            creator: {
                id: creatorId || this.getMyId(),
                type: creatorType
            },
            media: {
                type: "POLL",
                poll: {
                    question,
                    formattedOptions
                }
            }
        };

        formData.append('post', JSON.stringify(postPayload));
        return this._sendFormData(formData);
    }
    /**
        * Sends a link post to the server.
        *
        * @param {Object} options - The options for the link post.
        * @param {string} options.content - The content of the post.
        * @param {string} [options.referenceType="POD"] - The reference type of the post.
        * @param {string} options.referenceId - The reference ID of the post.
        * @param {string} [options.rootPostId=""] - The root post ID of the post.
        * @param {string} options.creatorId - The ID of the creator of the post.
        * @param {string} options.creatorType - The type of the creator of the post.
        * @param {Array<Object>} options.links - The links to be included in the post.
        * @returns {Promise<any>} - The response from the server.
        */
    async sendLink({ content, referenceType = "POD", referenceId, rootPostId = "", creatorId, creatorType, links }) {
        const formData = new FormData();
        const postPayload = {
            content,
            referenceType,
            referenceId,
            rootPostId,
            creator: {
                id: creatorId || this.getMyId(),
                type: creatorType
            },
            media: {
                type: "LINK",
                links
            }
        };

        formData.append('post', JSON.stringify(postPayload));
        return this._sendFormData(formData);
    }

    /**
 * Asynchronously like a post.
 *
 * @param {Object} params - The parameters for liking a post.
 * @param {string} params.referenceId - The ID of the post to like.
 * @param {string} [params.referenceType='POST'] - The type of the reference, defaults to 'POST'.
 * @returns {Promise<Object>} - The response data from the like API.
 */
    async likePost({ referenceId, referenceType = "POST" }) {
        const url = `${this.baseUrl}/v1/like`;
        const headers = {
            'Accept': 'application/json',
            'Access-Token': this.accessToken,
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        const requestOptions = {
            method: 'POST',
            headers,
            body: new URLSearchParams({
                referenceId,
                referenceType
            })
        };

        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    /**
 * Asynchronously retrieves a user's data from the API.
 *
 * @param {string} userId - The ID of the user to retrieve.
 * @returns {Promise<Object>} - The user data as a JSON object.
 * @throws {Error} - If there is an error fetching the user data.
 */
    async getUser(userId) {
        const url = `${this.baseUrl}/v2/user/${userId}`;
        const headers = {
            'Accept': 'application/json',
            'Access-Token': this.accessToken
        };

        const requestOptions = {
            method: 'GET',
            headers
        };

        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    /**
 * Sends a conversation message to the specified recipient.
 *
 * @param {Object} params - The parameters for sending the conversation.
 * @param {string} params.receiverId - The ID of the recipient.
 * @param {string} params.text - The text content of the conversation message.
 * @returns {Promise<Object>} - The response data from the server.
 */
    async sendConversation({ receiverId, text }) {
        const url = `${this.baseUrl}/v1/conversation`;
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Token': this.accessToken
        };

        const payload = {
            receiverId,
            text
        };

        const requestOptions = {
            method: 'POST',
            headers,
            body: JSON.stringify(payload)
        };

        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}

