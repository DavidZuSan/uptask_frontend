import ProjectForm from "@/components/projects/ProjectForm";
import { useAuth } from "@/hooks/useAuth";

export default function ProfileView() {
  const { data, isLoading } = useAuth();

  if (isLoading) return "Cargando...";

  if(data) return <ProjectForm data={data}/>