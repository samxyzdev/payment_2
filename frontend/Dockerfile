FROM oven/bun:canary

# Set the working directory inside the container
WORKDIR /app

# Copy package.json, bun.lockb, and other necessary files
# COPY package*.json bun.lockb ./

# Install dependencies using bun
# RUN bun install

# Copy the rest of the application code to the container
COPY . .
RUN bun install

# Expose the port the application will run on
EXPOSE 5173

# Start the app in development mode
CMD ["bun", "run", "dev"]
