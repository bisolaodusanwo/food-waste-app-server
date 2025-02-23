const landingContent = {
  hero: {
    title: "Welcome to Food Savalage App",
    subtitle: "Donate surplus food to help those in need",
    image: "https://example.com/assets/images/hero.jpg",
  },
  features: [
    "Easy Food Donation",
    "Real-time Charity Matching",
    "Impact Reporting",
  ],
  testimonials: [
    {
      name: "Lisa",
      message: "This app made donating food simple and effective!",
      image:
        "https://plus.unsplash.com/premium_photo-1661373788628-411f09211c51?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM3fHxCbGFjayUyMGhhcHB5JTIwd29tYW58ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Amina",
      message: "I love how transparent and impactful the donation process is.",
      image:
        "https://images.unsplash.com/photo-1729021284682-8b26fef07721?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTkwfHxCbGFjayUyMGhhcHB5JTIwd29tYW58ZW58MHx8MHx8fDA%3D",
    },
  ],
  callToAction: {
    text: "Join Us Today",
    link: "/signup",
  },
};

exports.getLandingContent = (req, res, next) => {
  try {
    res.status(200).json({ data: landingContent });
  } catch (error) {
    next(error);
  }
};

exports.updateLandingContent = (req, res, next) => {
  try {
    const { hero, features, testimonials, callToAction } = req.body;

    if (hero && typeof hero !== "object")
      throw new Error("Invalid hero format");
    if (features && !Array.isArray(features))
      throw new Error("Features should be an array");
    if (testimonials && !Array.isArray(testimonials))
      throw new Error("Testimonials should be an array");
    if (callToAction && typeof callToAction !== "object")
      throw new Error("Invalid callToAction format");

    Object.assign(landingContent, req.body);

    res.status(200).json({
      success: true,
      message: "Landing content updated successfully",
      data: landingContent,
    });
  } catch (error) {
    console.error("Error updating landing content:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
