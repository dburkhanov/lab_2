FROM python:3.10-alpine

WORKDIR /app

LABEL maintainer="Student"
LABEL description="StudentTracker Application"
LABEL version="1.0"

RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8007

CMD ["python", "manage.py", "runserver", "0.0.0.0:8007"]