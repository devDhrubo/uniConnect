# UniConnect Backend

A comprehensive backend server for the UniConnect platform with MongoDB integration.

## Features

- **Blood Donation System**: Donor registration, blood requests, and matching
- **Lost & Found**: Item reporting and matching system
- **Donation Management**: Flood relief and medical aid fundraising campaigns
- **Event Management**: Campus events with registration system
- **Auction System**: Student marketplace for buying/selling items
- **Bulletin Board**: Official announcements and notices

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment

Copy `.env` file and configure your settings:

- MongoDB connection string
- JWT secret
- Email configuration
- File upload settings

### 3. Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Database Setup

### Using Local MongoDB

1. Install MongoDB locally
2. Set `MONGODB_URI=mongodb://localhost:27017/uniconnect` in `.env`

### Using MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a cluster
3. Get connection string and update `MONGODB_URI` in `.env`

## API Endpoints

### Blood Donation

- `POST /api/blood/donors` - Register blood donor
- `GET /api/blood/donors` - Get all donors
- `POST /api/blood/requests` - Create blood request
- `GET /api/blood/requests` - Get blood requests
- `POST /api/blood/requests/:id/respond` - Respond to blood request

### Lost & Found

- `POST /api/lost-found` - Report lost/found item
- `GET /api/lost-found` - Get all items
- `GET /api/lost-found/:id/matches` - Find potential matches
- `PUT /api/lost-found/:id/resolve` - Mark as resolved

### Donations (Flood Relief & Medical Aid)

- `POST /api/donations` - Create donation campaign
- `GET /api/donations` - Get all campaigns
- `POST /api/donations/:id/donate` - Make a donation
- `POST /api/donations/:id/updates` - Add campaign update

### Events

- `POST /api/events` - Create event
- `GET /api/events` - Get all events
- `POST /api/events/:id/register` - Register for event
- `POST /api/events/:id/feedback` - Submit feedback

### Auction

- `POST /api/auction` - List item for auction/sale
- `GET /api/auction` - Get all items
- `POST /api/auction/:id/bid` - Place bid
- `POST /api/auction/:id/buy-now` - Buy now

### Bulletin Board

- `POST /api/bulletin` - Create bulletin
- `GET /api/bulletin` - Get all bulletins
- `POST /api/bulletin/:id/comments` - Add comment
- `POST /api/bulletin/:id/acknowledge` - Acknowledge bulletin

## Response Format

All API responses follow this format:

```json
{
  "status": "success|error",
  "message": "Description",
  "data": {
    /* Response data */
  }
}
```

## Error Handling

- **400**: Bad Request - Validation errors
- **404**: Not Found - Resource not found
- **500**: Internal Server Error - Server issues

## File Upload

Configure file upload settings in `.env`:

- `UPLOAD_MAX_SIZE`: Maximum file size in bytes
- `ALLOWED_FILE_TYPES`: Comma-separated mime types

## Development

### Project Structure

```
backend/
├── models/          # Database models
├── routes/          # API routes
├── uploads/         # Uploaded files
├── server.js        # Main server file
└── package.json     # Dependencies
```

### Adding New Features

1. Create model in `models/`
2. Create routes in `routes/`
3. Add route to `server.js`
4. Update this documentation

## Production Deployment

### Environment Variables

Set these in production:

- `NODE_ENV=production`
- `MONGODB_URI=<your-production-db>`
- `JWT_SECRET=<strong-secret>`
- `FRONTEND_URL=<your-frontend-domain>`

### Security Considerations

- Use HTTPS in production
- Set strong JWT secret
- Implement rate limiting
- Add authentication middleware
- Validate all inputs
- Sanitize user data

## Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## Support

For issues and questions:

- Check existing issues on GitHub
- Create new issue with detailed description
- Include error logs and steps to reproduce
