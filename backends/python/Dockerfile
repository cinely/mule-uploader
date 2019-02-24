FROM python:3

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# COPY dev.pem /etc/ssl/certs/
# RUN c_rehash /etc/ssl/certs/

COPY key.json ./
COPY main.py ./

CMD [ "python", "/app/main.py" ]