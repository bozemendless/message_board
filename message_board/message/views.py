from django.shortcuts import render
from datetime import datetime
from django.http import JsonResponse
from message.models import Message
import json

def index(request):
    return render(request, 'messages/index.html',{
        'current_time': str(datetime.now()),
    })

def create_message(request):
    if request.method == 'POST':
        message = Message()
        message.content = request.POST.get('text')
        message.image = request.FILES.get('image')
        if not message.content or not message.image:
            error = "content and image is required."
            res = {
                'error': True,
                'message': error
            }
            return JsonResponse(res, status=400)
        message.save()

        res = {
            'ok':True
        }
        return JsonResponse(res)

    if request.method == 'GET':
        messages = Message.objects.all()
        res = {
            str(i.id):[json.loads(i.content), str(i.image), str(i.create_time)] for i in messages
        }
        return JsonResponse(res)
