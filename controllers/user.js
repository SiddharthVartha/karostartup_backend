const bcrypt = require("bcryptjs");
const Register = require("../models/register");
const crypto = require("crypto");
var Jimp = require("jimp");
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(password);
  if (!email || !password) {
    return res.status(422).json({ error: "Plz Fill Data" });
  } else {
    let user = await Register.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Incorrect Credentials" });
    } else {
      const Hash = await bcrypt.compare(password, user.password);
      if (Hash) {
        res.json({
          sucess: true,
          data: user,
        });
      } else {
        return res.status(404).json({ error: "Incorrect Credentials" });
      }
    }
  }
};

const register = async (req, res) => {
  try {
    let lvl = 0;
    let discUserName = [""];
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      cityOfCollege,
      college,
      year,
      degree,
      stream,
      referral,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !phoneNumber ||
      !cityOfCollege ||
      !college ||
      !year ||
      !degree ||
      !stream
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all details",
      });
    } else {
      let Student = await Register.findOne({ email: email });
      if (Student) {
        res.status(400).json({
          success: false,
          error: "user already exist",
        });
      }
      console.log(referral);
      if (referral) {
        console.log("referred");
        let res = await Register.updateOne(
          { _id: referral },
          { $inc: { noOfReferrals: 1 } }
        );
        let checkDiscount = await Register.findById({ _id: referral });
        if (checkDiscount.noOfReferrals == 5) {
          const coupon = crypto.randomBytes(6).toString("hex");
          await Register.updateOne(
            { _id: referral },
            { $set: { discount: coupon } }
          );
          lvl = checkDiscount.level[0];
          discUserName[0] = checkDiscount.firstName;
        } else if (checkDiscount.noOfReferrals == 10) {
          const certificateUrl =
            "https://i.pinimg.com/originals/8f/c2/4d/8fc24d77e097ffe3d17c5209d5a0a0c7.jpg";
          const image = await Jimp.read(certificateUrl);
          const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
          let fullName = checkDiscount.firstName + " " + checkDiscount.lastName;
          image.print(font, 479, 449, fullName);
          image.write("certificate.jpg");
          lvl = checkDiscount.level[1];
        } else if (checkDiscount.noOfReferrals >= 15) {
          lvl = checkDiscount.level[2];
        }
      }
      const SecurePass = await bcrypt.hash(password, 10);

      Student = await new Register({
        firstName,
        lastName,
        email,
        password: SecurePass,
        phoneNumber,
        cityOfCollege,
        college,
        year,
        degree,
        stream,
        referral,
      });

      Student.referralLink = `http://localhost:3000/?re=${Student._id}`;
      Student.save();
      res.status(201).json({
        success: true,
        data: Student,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      data: "some error occured",
    });
  }
};
module.exports = {
  login,
  register,
};
