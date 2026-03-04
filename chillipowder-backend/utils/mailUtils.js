const nodemailer = require('nodemailer');

const sendOrderEmail = async (order, user) => {
    // For development, we use Ethereal Mail
    // In production, user would provide Gmail/SMTP credentials
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    const itemsHtml = order.orderItems.map(item => `
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.qty}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">₹${item.price}</td>
        </tr>
    `).join('');

    const emailHtml = `
        <div style="font-family: 'Outfit', sans-serif; max-width: 600px; margin: auto; border: 1px solid #e11d48; border-radius: 20px; overflow: hidden;">
            <div style="background-color: #e11d48; color: white; padding: 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px; letter-spacing: 2px;">STRAIGHTWAY</h1>
                <p style="margin: 5px 0 0; font-size: 10px; opacity: 0.8; text-transform: uppercase; letter-spacing: 2px;">Flour & Oil Mill</p>
                <p style="margin: 10px 0 0; font-size: 12px; opacity: 0.8; text-transform: uppercase; letter-spacing: 1px;">Order Confirmation</p>
            </div>
            <div style="padding: 30px; color: #0f172a;">
                <h2 style="font-size: 20px; margin-bottom: 20px;">Hello ${user.name},</h2>
                <p style="line-height: 1.6; color: #475569;">Thank you for your order! We are currently processing your culinary essentials with precision.</p>
                
                <div style="margin: 30px 0; background-color: #f8fafc; padding: 20px; border-radius: 12px;">
                    <p style="margin: 0 0 10px; font-weight: bold; color: #e11d48; font-size: 14px; text-transform: uppercase;">Order Details</p>
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="text-align: left; font-size: 12px; color: #94a3b8; text-transform: uppercase;">
                                <th style="padding-bottom: 10px;">Item</th>
                                <th style="padding-bottom: 10px;">Qty</th>
                                <th style="padding-bottom: 10px;">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHtml}
                        </tbody>
                    </table>
                    <div style="margin-top: 20px; text-align: right; font-weight: bold; font-size: 18px;">
                        Total: <span style="color: #e11d48;">₹${order.totalPrice}</span>
                    </div>
                </div>

                <div style="margin: 30px 0;">
                    <p style="margin: 0 0 10px; font-weight: bold; font-size: 14px; text-transform: uppercase; color: #475569;">Shipping Address</p>
                    <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">
                        ${order.shippingAddress.address}<br>
                        ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}<br>
                        ${order.shippingAddress.country}
                    </p>
                </div>

                <p style="text-align: center; font-size: 12px; color: #94a3b8; margin-top: 40px;">
                    This is an automated system confirmation. You will receive another notification once your order is dispatched.
                </p>
            </div>
            <div style="background-color: #0f172a; color: #94a3b8; padding: 15px; text-align: center; font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">
                © 2026 StraightWay Precision Milling. All Rights Reserved.
            </div>
        </div>
    `;

    const mailOptions = {
        from: '"StraightWay Administration" <noreply@straightway.com>',
        to: user.email,
        subject: `Order Recieved - #${order._id.toString().slice(-6).toUpperCase()}`,
        html: emailHtml,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Professional Order Notification Dispatched: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return info;
};

const sendStockAlertEmail = async (product) => {
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    const emailHtml = `
        <div style="font-family: 'Outfit', sans-serif; max-width: 600px; margin: auto; border: 1px solid #f59e0b; border-radius: 20px; overflow: hidden;">
            <div style="background-color: #f59e0b; color: white; padding: 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px; letter-spacing: 2px;">STRAIGHTWAY</h1>
                <p style="margin: 5px 0 0; font-size: 10px; opacity: 0.8; text-transform: uppercase; letter-spacing: 2px;">Flour & Oil Mill</p>
                <p style="margin: 10px 0 0; font-size: 12px; opacity: 0.8; text-transform: uppercase; letter-spacing: 1px;">Low Stock Warning</p>
            </div>
            <div style="padding: 30px; color: #0f172a;">
                <h2 style="font-size: 20px; margin-bottom: 20px;">Urgent: Stock Threshold Reached</h2>
                <p style="line-height: 1.6; color: #475569;">The following product in your master collection is reaching critical levels. Please authorize a restock to ensure continuous fulfillment.</p>
                
                <div style="margin: 30px 0; background-color: #fffbeb; padding: 20px; border-radius: 12px; border: 1px solid #fef3c7;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="font-weight: bold; color: #92400e; padding-bottom: 5px;">Product Name</td>
                            <td style="text-align: right; color: #0f172a;">${product.name}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold; color: #92400e;">Remaining Units</td>
                            <td style="text-align: right; color: #b45309; font-weight: 900; font-size: 18px;">${product.countInStock}</td>
                        </tr>
                    </table>
                </div>

                <div style="text-align: center; margin-top: 40px;">
                    <a href="http://localhost:5174/admin/product/${product._id}/edit" style="background-color: #0f172a; color: white; padding: 15px 30px; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Update Inventory</a>
                </div>
            </div>
            <div style="background-color: #0f172a; color: #94a3b8; padding: 15px; text-align: center; font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">
                © 2026 StraightWay Precision Milling. All Rights Reserved.
            </div>
        </div>
    `;

    const mailOptions = {
        from: '"StraightWay Logistics" <alerts@straightway.com>',
        to: 'admin@straightway.com', // In production, this would be the owner's email
        subject: `⚠️ LOW STOCK ALERT: ${product.name}`,
        html: emailHtml,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Low Stock Alert Dispatched: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return info;
};

module.exports = { sendOrderEmail, sendStockAlertEmail };
