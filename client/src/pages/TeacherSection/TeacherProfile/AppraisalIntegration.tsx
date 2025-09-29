"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Target, Award, ExternalLink, TrendingUp } from "lucide-react"

interface AppraisalIntegrationProps {
  appraisalData: any
}

export const AppraisalIntegration: React.FC<AppraisalIntegrationProps> = ({ appraisalData }) => {
  const handleViewFullAppraisal = () => {
    // TODO: API call to faculty appraisal portal
    // window.open(`${FACULTY_APPRAISAL_URL}/teacher/${teacherId}`, '_blank');
    console.log("Redirect to faculty appraisal portal")
  }

  const handleSyncData = () => {
    // TODO: API call to sync data with appraisal portal
    // await syncWithAppraisalPortal(teacherId);
    console.log("Sync data with appraisal portal")
  }

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return "text-green-600"
    if (score >= 4.0) return "text-blue-600"
    if (score >= 3.5) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Faculty Appraisal Integration
          </div>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {appraisalData.currentYear}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className={`text-2xl font-bold ${getScoreColor(appraisalData.teachingScore)}`}>
              {appraisalData.teachingScore}
            </div>
            <div className="text-sm text-gray-600">Teaching Score</div>
            <Progress value={appraisalData.teachingScore * 20} className="mt-2" />
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className={`text-2xl font-bold ${getScoreColor(appraisalData.researchScore)}`}>
              {appraisalData.researchScore}
            </div>
            <div className="text-sm text-gray-600">Research Score</div>
            <Progress value={appraisalData.researchScore * 20} className="mt-2" />
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className={`text-2xl font-bold ${getScoreColor(appraisalData.serviceScore)}`}>
              {appraisalData.serviceScore}
            </div>
            <div className="text-sm text-gray-600">Service Score</div>
            <Progress value={appraisalData.serviceScore * 20} className="mt-2" />
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className={`text-2xl font-bold ${getScoreColor(appraisalData.overallScore)}`}>
              {appraisalData.overallScore}
            </div>
            <div className="text-sm text-gray-600">Overall Score</div>
            <Progress value={appraisalData.overallScore * 20} className="mt-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-600" />
              Current Goals
            </h4>
            <div className="space-y-2">
              {appraisalData.goals.map((goal: string, index: number) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-sm text-gray-700">{goal}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-green-600" />
              Recent Achievements
            </h4>
            <div className="space-y-2">
              {appraisalData.achievements.map((achievement: string, index: number) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-sm text-gray-700">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6 pt-4 border-t">
          <Button onClick={handleViewFullAppraisal} className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            View Full Appraisal
          </Button>
          <Button onClick={handleSyncData} variant="outline" className="flex items-center gap-2 bg-transparent">
            <TrendingUp className="w-4 h-4" />
            Sync Data
          </Button>
        </div>

        {/* TODO: API integration with faculty appraisal portal */}
        {/*
        const syncWithAppraisalPortal = async (teacherId) => {
          const response = await fetch(`/api/appraisal/sync/${teacherId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
          });
          const data = await response.json();
          return data;
        };
        
        const fetchAppraisalData = async (teacherId) => {
          const response = await fetch(`/api/appraisal/${teacherId}`);
          const data = await response.json();
          return data;
        };
        */}
      </CardContent>
    </Card>
  )
}
