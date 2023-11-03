FROM node:20.5-alpine3.18
WORKDIR /app
ENV PORT=8080
RUN adduser -D nonroot && chown -R nonroot:nonroot /app
USER nonroot
COPY node_modules /app/node_modules
COPY dist/amver-ui /app/dist/amver-ui
COPY server.js /app/
EXPOSE 8080
CMD [ "node", "server.js" ]
HEALTHCHECK CMD curl --fail http://localhost:8080 || exit 1
