"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { generateLessonPlan } from "@/lib/gemini";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useReactToPrint } from "react-to-print";

export default function LessonPlanner() {
  const [topic, setTopic] = useState("");
  const [grade, setGrade] = useState("");
  const [mainConcept, setMainConcept] = useState("");
  const [materials, setMaterials] = useState("");
  const [learningObjectives, setLearningObjectives] = useState("");
  const [lessonOutline, setLessonOutline] = useState("");
  const [generatedLesson, setGeneratedLesson] = useState("");
  const [loading, setLoading] = useState(false);

  const { theme, systemTheme } = useTheme();
  const isDark =
    theme === "dark" || (theme === "system" && systemTheme === "dark");
  const contentRef = useRef<HTMLDivElement | null>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: `Lesson_Plan_${topic}`,
    onBeforePrint: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
    },
  });

  useEffect(() => {
    // Load from Local Storage
    setTopic(localStorage.getItem("topic") || "");
    setGrade(localStorage.getItem("grade") || "");
    setMainConcept(localStorage.getItem("mainConcept") || "");
    setMaterials(localStorage.getItem("materials") || "");
    setLearningObjectives(localStorage.getItem("learningObjectives") || "");
    setLessonOutline(localStorage.getItem("lessonOutline") || "");
    setGeneratedLesson(localStorage.getItem("generatedLesson") || "");
  }, []);

  useEffect(() => {
    // Save to Local Storage
    localStorage.setItem("topic", topic);
    localStorage.setItem("grade", grade);
    localStorage.setItem("mainConcept", mainConcept);
    localStorage.setItem("materials", materials);
    localStorage.setItem("learningObjectives", learningObjectives);
    localStorage.setItem("lessonOutline", lessonOutline);
    localStorage.setItem("generatedLesson", generatedLesson);
  }, [
    topic,
    grade,
    mainConcept,
    materials,
    learningObjectives,
    lessonOutline,
    generatedLesson,
  ]);

  const handleGenerateLesson = async () => {
    setLoading(true);
    setGeneratedLesson("");

    const prompt = `
      Generate a structured lesson plan for:
      - Topic: ${topic}
      - Grade Level: ${grade}
      - Main Concept: ${mainConcept}
      - Materials: ${materials}
      - Learning Objectives: ${learningObjectives}
      - Lesson Outline: ${lessonOutline}
      
      Properly format the content for printing. 
    `;

    const response = await generateLessonPlan(prompt);
    setGeneratedLesson(response);
    setLoading(false);
  };

  return (
    <div
      className={`flex flex-col transition-colors duration-300 md:flex-row h-fit  ${
        isDark ? "bg-darkBg text-darkText" : "bg-lightBg text-lightText"
      }`}
    >
      {/* Left Side */}
      <div className="w-full md:w-1/2 p-6 border-b md:border-b-0 md:border-r border-gray-700 h-full overflow-hidden">
        <h1 className="text-2xl font-bold mb-4">AI-Powered Lesson Planner</h1>

        <Card
          className={`p-4 flex flex-col gap-4 transition-colors duration-300 ${
            theme === "dark"
              ? "bg-darkBg text-darkText"
              : "bg-lightBg text-lightText"
          }`}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleGenerateLesson();
            }}
            className="flex-1 overflow-y-auto space-y-2"
          >
            <div>
              <h2 className="text-lg font-semibold mb-1">Lesson Topic</h2>
              <Input
                type="text"
                placeholder="Enter topic"
                value={topic}
                required
                onChange={(e) => setTopic(e.target.value)}
                className="border border-gray-500 rounded-md p-2"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-1">Grade Level</h2>
              <Input
                type="text"
                placeholder="Enter grade level"
                value={grade}
                required
                onChange={(e) => setGrade(e.target.value)}
                className="border border-gray-500 rounded-md p-2"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-1">
                Main Concept & Subtopics
              </h2>
              <Input
                type="text"
                placeholder="Enter key concepts"
                value={mainConcept}
                required
                onChange={(e) => setMainConcept(e.target.value)}
                className="border border-gray-500 rounded-md p-2"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-1">Materials Needed</h2>
              <Textarea
                placeholder="List materials"
                value={materials}
                required
                onChange={(e) => setMaterials(e.target.value)}
                className="border border-gray-500 rounded-md p-2 max-h-32 overflow-y-auto"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-1">
                Learning Objectives
              </h2>
              <Textarea
                placeholder="Define objectives"
                value={learningObjectives}
                required
                onChange={(e) => setLearningObjectives(e.target.value)}
                className="border border-gray-500 rounded-md p-2 max-h-32 overflow-y-auto"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-1">Lesson Outline</h2>
              <Textarea
                placeholder="Enter lesson steps"
                value={lessonOutline}
                onChange={(e) => setLessonOutline(e.target.value)}
                className="border border-gray-500 rounded-md p-2 max-h-32 overflow-y-auto"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Lesson Plan"}
            </Button>
          </form>
        </Card>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 p-6 flex flex-col overflow-hidden">
        <h2 className="text-xl font-semibold mb-4">Generated Lesson Plan</h2>

        <Card
          className={`p-4 flex flex-col h-[60vh] flex-1 transition-colors duration-300 ${
            theme === "dark"
              ? "bg-darkBg text-darkText"
              : "bg-lightBg text-lightText"
          }`}
        >
          <div className="relative">
            <div className="flex-1 h-[60vh] overflow-y-auto border border-gray-500 rounded-md p-4">
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : (
                <Textarea
                  // ref={contentRef}
                  value={generatedLesson}
                  onChange={(e) => setGeneratedLesson(e.target.value)}
                  className="w-full h-full resize-none bg-transparent border-none focus:outline-none"
                  placeholder="Click 'Generate Lesson Plan' to create content."
                />
              )}
            </div>

            <div
              ref={contentRef}
              className="p-10 -z-10 absolute w-full top-1 pb-5 bg-white text-black"
            >
              <h1 className="text-4xl font-bold text-center mb-6">{topic}</h1>
              <hr className="my-4 border-black" />

              <hr className="my-6 border-black" />
              {/* Lesson Content */}
              <div className="text-lg leading-7 space-y-4">
                {generatedLesson.split("\n").map((line, index) =>
                  line.trim().length === 0 ? (
                    <br key={index} />
                  ) : line.startsWith("**") && line.endsWith("**") ? (
                    <h2 key={index} className="text-2xl font-bold mt-4">
                      {line.replace(/\*\*/g, "")}
                    </h2>
                  ) : (
                    <p key={index} className="ml-4">
                      {line}
                    </p>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Button Stays Fixed at Bottom */}
          <div className="mt-4">
            <Button
              onClick={() => reactToPrintFn()}
              className="w-full bg-green-600 hover:bg-green-500"
              disabled={!generatedLesson.trim()}
            >
              Download PDF
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
