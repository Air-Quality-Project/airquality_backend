import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // 1️⃣ Create user
    const user = await registerUser({ name, email, password });

    // 2️⃣ Auto-login after register
    const { token } = await loginUser({ email, password });

    // 3️⃣ Send token + user
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await loginUser({ email, password });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        
      },
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
