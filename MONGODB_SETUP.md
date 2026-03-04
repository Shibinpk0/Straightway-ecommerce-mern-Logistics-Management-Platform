# MongoDB Atlas Setup Guide

Follow these steps to set up a free cloud database for your ChilliPowder project.

## 1. Create an Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2. Sign up for a free account (you can use your Google account).

## 2. Create a Cluster
1. After logging in, click **+ Create**.
2. Select the **M0** (Free) tier.
3. Choose a provider (AWS/Google/Azure) and region close to you.
4. Click **Create Deployment**.

## 3. Create a Database User
1. You will be asked to set up security.
2. Create a **Username** (e.g., `admin`).
3. Create a **Password** (e.g., `password123` - *Make sure to remember this!*).
4. Click **Create Database User**.

## 4. Allow Network Access
1. Scroll down to **Network Access** or "IP Access List".
2. Click **Add IP Address**.
3. Select **Allow Access from Anywhere** (0.0.0.0/0). *This makes it easy to connect from your computer.*
4. Click **Confirm**.

## 5. Get Connection String
1. Go back to the **Database** overview.
2. Click **Connect** on your cluster.
3. Select **Drivers**.
4. You will see a connection string like this:
   `mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
5. **Copy** this string.

## 6. Update Your Project
1. Open the `.env` file in `chillipowder-backend`.
2. Replace the `MONGO_URI` value with your copied string.
3. **Important**: Replace `<password>` with the actual password you created in Step 3.

Example:
```env
MONGO_URI=mongodb+srv://admin:password123@cluster0.abcde.mongodb.net/chillipowder?retryWrites=true&w=majority
```
