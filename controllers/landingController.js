const landingContent = {
  hero: {
    title: "Welcome to Food Waste App",
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
    },
    {
      name: "Amina",
      message: "I love how transparent and impactful the donation process is.",
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
    Object.assign(landingContent, req.body);
    res.status(200).json({
      message: "Landing content updated successfully",
      data: landingContent,
    });
  } catch (error) {
    next(error);
  }
};
