FROM alexmazzariol/docker-selenium-chrome-angular

WORKDIR /root/

COPY / /root/

RUN npm install && npm run-script build