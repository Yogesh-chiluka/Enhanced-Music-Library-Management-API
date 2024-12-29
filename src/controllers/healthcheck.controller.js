import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const healthCheck = asyncHandler(async (req, res) => { 
    const acceptHeader = req.headers['accept']; 
    if (acceptHeader && acceptHeader.includes('application/json')) 
    { 
        res.status(200).json({ status: 200, message: "OK" }); 
    } else { 
        
        res.status(200).send(` 
            <!DOCTYPE html> <html> <head> <title>Health Check</title> </head> <body>
             <h1 style="text-align: center;">Server Health: OK</h1> 
                <h1 style="text-align: center;">Base url:</h1> 
             <a href="https://enhanced-music-library-management-api-2.onrender.com/api/v1"><h2 style="text-align: center;">https://enhanced-music-library-management-api-2.onrender.com/api/v1</h2></a>
             </body> </html> `
        ); 
    } });



const apiEndPoints = asyncHandler(async (req, res) => { 
    const acceptHeader = req.headers['accept']; 
    if (acceptHeader && acceptHeader.includes('application/json')) 
    { 
        res.status(200).json({ status: 200, message: "OK" }); 
    } else { 
        
        res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head>
        <style>
        table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 80%;
        margin: auto;
        }
        
        td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
        }
        
        tr:nth-child(even) {
        background-color: #dddddd;
        }
        </style>
        </head>
        <body>
        
        <h2  style="text-align: center;" >BASEURL: <a href="https://enhanced-music-library-management-api-2.onrender.com/api/v1/">https://enhanced-music-library-management-api-2.onrender.com/api/v1</h2></a>
        
        <table>
            <tr>
                <th>HTTP Methods</th>
                <th>Endpoint</th>
                <th>Status Codes</th>
            </tr>
            <tr>
                <td>GET</td>
                <td>BASEURL/Logout</td>
                <td>200, 400</td>
            </tr>
            <tr>
                <td>POST</td>
                <td>BASEURL/signup</td>
                <td>201, 400, 409</td>
            </tr>
            <tr>
                <td>POST</td>
                <td>BASEURL/login</td>
                <td>200, 400, 404</td>
            </tr>
            <tr>
                <td>GET</td>
                <td>BASEURL/users</td>
                <td>200, 400, 401</td>
            </tr>
            <tr>
                <td>POST</td>
                <td>BASEURL/users/add-user</td>
                <td>201, 400, 401, 403, 409</td>
            </tr>
            <tr>
                <td>DELETE</td>
                <td>BASEURL/users/:id</td>
                <td>200, 400, 401, 403, 404</td>
            </tr>
            <tr>
                <td>PUT</td>
                <td>BASEURL/users/update-password</td>
                <td>204, 400, 401, 403, 404</td>
            </tr>
            <tr>
                <td>GET</td>
                <td>BASEURL/artists</td>
                <td>200, 400, 401</td>
            </tr>
            <tr>
                <td>GET</td>
                <td>BASEURL/artists/:id</td>
                <td>200, 401, 403, 404</td>
            </tr>
            <tr>
                <td>POST</td>
                <td>BASEURL/artists/add-artist</td>
                <td>201, 400, 401</td>
            </tr>
            <tr>
                <td>PUT</td>
                <td>BASEURL/artists/:id</td>
                <td>204, 400, 401, 403, 404</td>
            </tr>
            <tr>
                <td>DELETE</td>
                <td>BASEURL/artists/:id</td>
                <td>200, 400, 401, 403, 404</td>
            </tr>
            <tr>
                <td>GET</td>
                <td>BASEURL/albums</td>
                <td>200, 400, 401, 403, 404</td>
            </tr>
            <tr>
                <td>GET</td>
                <td>BASEURL/albums/:id</td>
                <td>200, 401, 403, 404</td>
            </tr>
            <tr>
                <td>POST</td>
                <td>BASEURL/albums/add-album</td>
                <td>201, 400, 401, 403, 400</td>
            </tr>
            <tr>
                <td>PUT</td>
                <td>BASEURL/albums/:id</td>
                <td>204, 400, 401, 403, 404</td>
            </tr>
            <tr>
                <td>DELETE</td>
                <td>BASEURL/albums/:id</td>
                <td>200, 400, 401, 403, 404</td>
            </tr>
            <tr>
                <td>GET</td>
                <td>BASEURL/tracks</td>
                <td>200, 400, 401, 403, 404</td>
            </tr>
            <tr>
                <td>GET</td>
                <td>BASEURL/tracks/:id</td>
                <td>200, 400, 401, 403, 404</td>
            </tr>
            <tr>
                <td>POST</td>
                <td>BASEURL/tracks/add-track</td>
                <td>201, 400, 401, 403, 404</td>
            </tr>
            <tr>
                <td>PUT</td>
                <td>BASEURL/tracks/:id</td>
                <td>204, 400, 401, 403, 404</td>
            </tr>
            <tr>
                <td>DELETE</td>
                <td>BASEURL/tracks/:id</td>
                <td>200, 400, 401, 403, 404</td>
            </tr>
            <tr>
                <td>GET</td>
                <td>BASEURL/favorites/:category</td>
                <td>200, 400, 401, 403</td>
            </tr>
            <tr>
                <td>POST</td>
                <td>BASEURL/favorites/add-favorite</td>
                <td>201, 400, 401, 403, 404</td>
            </tr>
            <tr>
                <td>DELETE</td>
                <td>BASEURL/favorites/remove-favorite/:id</td>
                <td>200, 400, 401, 403, 404</td>
            </tr>
        </table>
        
        
        
        </body>
        </html>`); 
} });

    
    
    
export {
    healthCheck,
    apiEndPoints
}