import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MessageSquare, TrendingUp } from "lucide-react"

interface StudentFeedbackProps {
  feedbackData: any
}

export const StudentFeedback: React.FC<StudentFeedbackProps> = ({ feedbackData }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          Student Feedback & Reviews
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-3xl font-bold text-yellow-600 mb-1">{feedbackData.averageRating}</div>
            <div className="flex justify-center mb-2">{renderStars(Math.floor(feedbackData.averageRating))}</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-1">{feedbackData.totalReviews}</div>
            <div className="text-sm text-gray-600">Total Reviews</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-sm text-gray-600">Trending Up</div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Recent Reviews</h4>
          {feedbackData.recentReviews.map((review: any) => (
            <div key={review.id} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{review.studentName}</span>
                  <Badge variant="outline" className="text-xs">
                    {review.subject}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  {renderStars(review.rating)}
                  <span className="text-sm text-gray-600 ml-1">{new Date(review.date).toLocaleDateString()}</span>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-2">{review.comment}</p>
              <div className="text-xs text-gray-500">Semester: {review.semester}</div>
            </div>
          ))}
        </div>

        {/* TODO: API call to load more reviews */}
        {/* 
        const loadMoreReviews = async () => {
          const moreReviews = await fetchTeacherReviews(teacherId, page + 1);
          setReviews([...reviews, ...moreReviews]);
        };
        */}
      </CardContent>
    </Card>
  )
}
