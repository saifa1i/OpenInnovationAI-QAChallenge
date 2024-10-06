# Use an official Node.js image as the base
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code
COPY tests/ ./tests/
COPY . .

# Install Playwright browsers
RUN npx playwright install

# Install TypeScript
RUN npm install -g typescript

# Ensure reports directory exists
RUN mkdir -p playwright-report

# Set the default command to run tests and generate reports
CMD ["npx", "playwright", "test", "--reporter=html", "--output=playwright-report"]