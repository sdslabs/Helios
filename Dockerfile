FROM node:14.18.1-alpine AS builder

# directory for the app in the container
WORKDIR /usr/app

# copies all the app's files from host into the container folder which 
# might include the node_modules dir if npm install executed in the host
COPY . /usr/app

# yarn install --frozen-lockfile is used to install all exact version dependencies or devDependencies 
# from a package-lock.json file. If a node_modules is already present, it will 
# be automatically.
RUN yarn install --frozen-lockfile

# # build the app
RUN yarn run build

FROM nginx:1.19-alpine AS server

# copy server.conf file from host into the container
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# copy build folder
COPY --from=builder /usr/app/build /usr/share/nginx/html