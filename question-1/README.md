# Question 1: About you

These last three months, I worked as a freelance back-end developer in a virtual fertility clinic called Apricity. The goal was to clean the back-end and improve the architecture. The project was one year old, so many features had been developed in a short amount of time by many different developers. The back-end was build with Node.js, TypeScript, NestJS, TypeORM, Jest, and PostgreSQL.

Most modules were developed differently, so one of my tasks was to clean each module so that it would have the same architecture. In the end, the back-end was separated into modules, each having the following structure:
```
module
- business
  - mapper
- controller
- domain
- dto
- entity
- repository
- service
  - mapper
```

The business and dto folders were not always used.

I also renamed many files, variables, and functions, and I cleaned the database. For the database, I removed unused columns, renamed camel case columns to snake case, and updated some column names for example. The goal was to homogenize the code and the different tables, and make the back-end stronger and easier to understand and maintain. I also discovered some bugs as I was adding types to variables.

Some other tasks involved fixing circular dependies, improving the way exceptions were handled, and adding documentation.
