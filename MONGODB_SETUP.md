# 🗄️ MongoDB Connection Guide

## ❌ Issue Found
**MongoDB is NOT installed on your system**

The connection error occurs because:
- ❌ MongoDB server (mongod) is not installed
- ❌ Cannot connect to `mongodb://localhost:27017`

---

## ✅ Solution: Choose One Option

### **OPTION 1: MongoDB Atlas (Cloud) - RECOMMENDED** ⭐

**Advantages:**
- No local installation needed
- Free tier available (512 MB)
- Works on any internet connection
- Automatic backups
- Easy to scale

**Steps:**

1. **Create Free Account**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Sign up with email or Google account

2. **Create a Cluster**
   - Click "Build a Cluster"
   - Select "Free Tier"
   - Choose AWS/Azure/Google Cloud (any region)
   - Click "Create Cluster"

3. **Get Connection String**
   - Wait for cluster to be created (5-10 minutes)
   - Click "Connect"
   - Choose "Connect Your Application"
   - Copy the connection string

4. **Update .env File**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ragging-report-db?retryWrites=true&w=majority
   ```
   Replace:
   - `username` - your MongoDB Atlas username
   - `password` - your MongoDB Atlas password

5. **Create IP Whitelist (if needed)**
   - Go to "Network Access"
   - Add your IP or use `0.0.0.0/0` for anywhere

6. **Restart Server**
   - Stop current server (Ctrl+C)
   - Run: `node server.js`

---

### **OPTION 2: Install MongoDB Locally** 

**Download & Install:**

**Windows:**
1. Download: https://www.mongodb.com/try/download/community
2. Run installer
3. Choose "Install MongoDB as a Service"
4. Installation completes automatically
5. MongoDB runs as Windows Service

**After Installation:**
1. Open Command Prompt as Administrator
2. Verify installation:
   ```
   mongod --version
   ```
3. MongoDB should automatically start
4. Keep `.env` as:
   ```
   MONGODB_URI=mongodb://localhost:27017/ragging-report-db
   ```

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

---

## 🔧 How to Fix Your Connection

### Step 1: Choose Your Database Option
- ✅ **MongoDB Atlas (Cloud)** - Recommended for beginners
- ✅ **Local MongoDB** - If you want full control

### Step 2: Update .env File

**For MongoDB Atlas:**
```
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/ragging-report-db?retryWrites=true&w=majority
```

**For Local MongoDB:**
```
MONGODB_URI=mongodb://localhost:27017/ragging-report-db
```

### Step 3: Restart Server
```
node server.js
```

You should see:
```
✅ MongoDB connected successfully
📍 Database: mongodb+srv://...
```

---

## 🧪 Test Connection

### Test with MongoDB Atlas

1. **Get Sample Connection Code:**
   ```javascript
   // test-connection.js
   const mongoose = require('mongoose');
   
   const uri = process.env.MONGODB_URI;
   
   mongoose.connect(uri)
     .then(() => {
       console.log('✅ MongoDB Atlas Connected!');
       process.exit(0);
     })
     .catch(err => {
       console.error('❌ Connection Failed:', err.message);
       process.exit(1);
     });
   ```

2. **Run Test:**
   ```
   node test-connection.js
   ```

---

## ⚠️ Common Connection Errors

### Error: "Connect ECONNREFUSED 127.0.0.1:27017"
**Cause:** MongoDB not running locally
**Fix:** Use MongoDB Atlas OR install and start MongoDB

### Error: "authentication failed"
**Cause:** Wrong username/password in connection string
**Fix:** Double-check credentials in MongoDB Atlas

### Error: "IP address not whitelisted"
**Cause:** Your IP not allowed
**Fix:** Add IP to MongoDB Atlas Network Access

### Error: "getaddrinfo ENOTFOUND cluster..."
**Cause:** Wrong cluster name
**Fix:** Copy exact connection string from MongoDB Atlas

---

## 📋 MongoDB Atlas Quick Setup (5 minutes)

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Sign Up"
3. Fill in details and create account
4. Click "Build a Cluster"
5. Select "Free" → Create
6. Wait for cluster (green status)
7. Click "Connect"
8. Select "Connect Your Application"
9. Choose "Node.js" → "Driver 4.0 or later"
10. Copy connection string
11. Update `.env` with your string
12. Replace username and password
13. Save and restart server

**Done!** ✅

---

## 🔑 MongoDB Atlas Credentials Format

Connection String Structure:
```
mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/DATABASE?retryWrites=true&w=majority
```

Example:
```
mongodb+srv://john_admin:secure123@maincluster-xyz.mongodb.net/ragging-report-db?retryWrites=true&w=majority
```

---

## ✅ After Connection Works

Once connected, you should see:
```
✅ MongoDB connected successfully
📍 Database: mongodb+srv://john_admin:***@maincluster-xyz.mongodb.net/ragging-report-db
Server running on port 5000
```

Then you can:
- ✅ Register students
- ✅ Register admins
- ✅ Submit complaints
- ✅ Upload images
- ✅ All features work!

---

## 🆘 Still Having Issues?

1. **Check .env file syntax** - No spaces around `=`
2. **Restart server** - Stop and start `node server.js`
3. **Check MongoDB status** - Ensure service/cluster is running
4. **Verify credentials** - Double-check username/password
5. **Try MongoDB Compass** - Visual tool to test connection

---

## 🎯 Next Steps

1. Choose MongoDB Atlas (recommended)
2. Create free account
3. Get connection string
4. Update `.env`
5. Restart server
6. Test by visiting http://localhost:5000

Your database will then be ready for all features! 🚀
