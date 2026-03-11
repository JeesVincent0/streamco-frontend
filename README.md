# Streamco Frontend

## Overview

Streamco is a **live streaming platform** where creators can create channels and broadcast live content.
It is similar to platforms like **YouTube Live and Kick**, but it also introduces a **real-time advertising auction system** that allows advertisers to bid for banner placements on creator streams.

This repository contains the **frontend application built with Next.js** that connects with the Streamco backend API.

The system supports multiple roles:

* Viewer
* Content Creator
* Advertiser
* Admin

Each role has its own features and dashboard.

---

## Tech Stack

* Next.js
* React
* TypeScript
* Redux Toolkit
* RTK Query
* Axios
* Tailwind CSS

---

## Main Features

### Live Streaming Platform

* Users can create accounts
* Users can create channels
* Creators can start live streams
* Viewers can watch live content

### Creator Dashboard

* Manage channel
* Schedule live streams
* Manage stream content
* Display advertisement banners during streams

### Advertising Auction System

* Advertisers can promote products or services
* Advertisers can bid for banner slots on creator streams
* Multiple advertisers can participate in auctions
* The highest bidder wins the banner placement for that scheduled stream

### Advertiser Portal

* Create advertising campaigns
* Participate in banner auctions
* Manage advertisements
* Track advertisement performance

### Admin Portal

* Manage users and creators
* Manage advertisers
* Monitor platform statistics
* View analytics and platform metrics

---

## Project Structure

```text
src
 ┣ app
 ┣ components
 ┣ features
 ┣ services
 ┣ store
 ┣ hooks
 ┗ utils
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/JeesVincent0/streamco-frontend.git
```

Navigate to the project folder

```bash
cd streamco-frontend
```

Install dependencies

```bash
npm install
```

---

## Running the Application

Start the development server

```bash
npm run dev
```

Open the application in your browser

```text
http://localhost:3000
```

---

## Environment Variables

Create a `.env.local` file in the root directory.

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

## Backend

This frontend communicates with the **Streamco backend API** which handles:

* Authentication
* Live streaming services
* Auction system
* Advertisement management
* Analytics and statistics

---

## Author

Jees Vincent
