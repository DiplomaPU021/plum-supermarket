import nc from "next-connect";
import User from "@/models/User";
import db from "@/utils/db";
import auth from "@/middleware/auth";

const handler = nc().use(auth);

handler.post(async (req, res) => {
    try {
        await db.connectDb();
        const { address } = req.body;
        let user = await User.findById(req.user);
        let user_addresses = user.address;
        address.active = true;
        let existingAddressIndex = user_addresses.findIndex(
            (existingAddress) => existingAddress.address === address.address
        );
        let addresses = [];
        for (let i = 0; i < user_addresses.length; i++) {
            let temp_address = {};
            if (existingAddressIndex !== i) {
                temp_address = { ...user_addresses[i].toObject(), active: false };
                addresses.push(temp_address);
            } else {
                addresses.push(address);
            }
        }
        if(existingAddressIndex ==-1) {
            addresses.push(address);
        }   
            await user.updateOne({
                address: addresses,
            }, { new: true });
     
        user = await User.findById(req.user);
        console.log("temp_addressUser2", user);
        await db.disconnectDb();
        return res.status(200).json({ addresses: user.address });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
handler.put(async (req, res) => {
    try {
        await db.connectDb();
        const { id } = req.body;
        let user = await User.findById(req.user);
        let user_addresses = user.address;
        let addresses = [];
        for (let i = 0; i < user_addresses.length; i++) {
            let temp_address = {};
            if (user_addresses[i]._id === id) {
                temp_address = { ...user_addresses[i].toObject(), active: true };
                addresses.push(temp_address);
            } else {
                temp_address = { ...user_addresses[i].toObject(), active: false };
                addresses.push(temp_address);
            }
        }
        await user.updateOne({
            address: addresses,
        },
            { new: true });
        await db.disconnectDb();
        return res.status(200).json({ addresses });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    };
});
handler.delete(async (req, res) => {
    try {
        await db.connectDb();
        const { id } = req.body;
        let user = await User.findById(req.user);
        await user.updateOne({
            $pull: { address: { _id: id } },
        }, { new: true });
        await db.disconnectDb();
        res.json({ address: user.address.filter((a) => a._id != id) });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export default handler;
