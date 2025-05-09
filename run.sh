#!/bin/bash

echo "Starting StudentTracker application..."

if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "Error: Docker Compose is not installed"
    exit 1
fi

echo "Building and starting Docker containers..."
docker-compose up -d --build

if [ $? -eq 0 ]; then
    echo "StudentTracker is now running!"
    echo "You can access it at: http://localhost:8007/myapp"
    echo ""
    echo "To view logs, run: docker-compose logs -f"
    echo "To stop the application, run: docker-compose down"
else
    echo "Error: Failed to start StudentTracker"
    exit 1
fi 