const {Review,Doctor,User} = require('../database/index')


module.exports = {
    getAllForDoctor: async (req, res) => {

      try {
        const doctorId = req.params.doctorId;
        const reviews = await Review.findAll({
          where: { doctorId: doctorId },
          include : User
        });
        res.json(reviews);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    
    },
    createReview: async (req, res) => {
      const { doctorId, userId, rating, comment } = req.body

      try {
        const newReview = await Review.create({
          DoctorId: doctorId,
          UserId: userId,
          review: comment,
          rating: rating,
        });
    
        res.status(201).json(newReview.toJSON());
      } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    
    },
    deleteOne: async (req, res) => {
      let id = req.params.id;
      try {
        const deletedReview = await Review.destroy({
          where: { id: Number(id) },
        });
        res.json(deletedReview);
      } catch (error) {
        throw error;
      }
    }
  };
