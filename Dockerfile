FROM python:3.9

WORKDIR /app

RUN git clone https://github.com/openinnovationai/recruiting-qa-challenge ./

RUN pip install --no-cache-dir -r requirements.txt

RUN apt-get update && apt-get install -y \
    curl && \
    curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs

RUN apt-get install -y netcat-openbsd

EXPOSE 8000

RUN fastapi dev application.py & \
    while ! nc -z localhost 8000; do sleep 0.1; done 

RUN mkdir playwright-tests && cd playwright-tests
COPY . .
RUN apt-get update && apt-get install -y \
    curl && \
    curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs
RUN apt-get install -y npm
RUN npm install
RUN npx playwright test
