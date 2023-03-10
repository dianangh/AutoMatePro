# CarCar

Team:
Diana A. - Sales API/Poller
Adrian O. Service API/Poller

## Design
We'll be using Bootstrap to customize the architecture of the project

## Service microservice

I'll create a service API that will handle all the automobile service appointments and a service poller that will integrate with all the other services. I'll have a AutoMobileVO, Technician and Appointment model. The AutomobileVo will take right from the inventory microservice.

## Sales microservice

The sales microservice and the inventory microservice are integrated to produce a duplicate of all the data related to automobiles as value objects (AutomobileVO), allowing the sales microservice to manage the automobile data independently without modifying any data from the inventory microservice. Users can generate new sales records, browse existing records by salesperson, add new employees to the system, browse records of salespeople, browse existing records of customers, and add potential clients to the database.
