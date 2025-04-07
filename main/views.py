from django.shortcuts import render, redirect
from .models import Todo
from .forms import TodoForm

def home(request):
    todos = Todo.objects.all()
    form = TodoForm()

    if request.method == "POST":
        form = TodoForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')

    # tasks can be marked as completed
    if request.method == "GET" and 'complete' in request.GET:
        todo_id = request.GET['complete']
        todo = Todo.objects.get(id=todo_id)
        todo.completed = True
        todo.save()
        return redirect('home')

    return render(request, 'main/home.html', {'todos': todos, 'form': form})

